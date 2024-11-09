import { Meteor } from "meteor/meteor";
import { Species } from "./species";
import { check } from "meteor/check";

import axios from "axios";

const GBIF_API_URL = "https://api.gbif.org/v1/occurrence/search";
const createdBy = require("../../startup/server/created-by.js");

Meteor.methods({
  async "species.fetchFromGBIF"() {
    this.unblock();

    try {
      const response = await axios.get(GBIF_API_URL, {
        params: {
          country: "CO",
          decimalLatitude: "1.396967,6.253041",
          decimalLongitude: "-78.189532,-76.5205",
          taxonKey: 1,
          limit: 300
        }
      });

      if (!response.data || !response.data.results) {
        throw new Meteor.Error("GBIF API response missing results");
      }

      const species = response.data.results.map(result => ({
        scientificName: result.scientificName,
        commonName: result.vernacularName,
        gbifID: result.speciesKey,
        taxonID: result.taxonID,
        class: result.class,
        latitude: result.decimalLatitude,
        longitude: result.decimalLongitude,
        media: result.media[0],
        genericName: result.genericName,
        stateProvince: result.stateProvince,
        verbatimLocality: result.verbatimLocality,
        iucnRedListCategory: result.iucnRedListCategory,
        family: result.family,
      }));
      for (let specimen of species) {
        await Species.insertAsync(specimen);
      }

      return species;

    }
    catch (error) {
      console.error("Error in GBIF API request:", error);
      throw new Meteor.Error("GBIF API request failed", error.message);
    }
  },
  async "species.fetchFromGBIFDelete"() {
    this.unblock();

    await Species.dropCollectionAsync();

  },
  async "species.addPhoto"(speciesId, photo) {
    check(speciesId, String);
    check(photo, {
      image: String,
      uploadedBy: String,
      status: String,
    });
    const createdByUser = await createdBy.getUser(photo.uploadedBy);

    await Species.updateAsync(
      { _id: speciesId },
      { $push: { photosUsers: {
        image: photo.image,
        createdby: createdByUser,
        status: photo.status
      } } }
    );
  },
  async "species.publicar"(scientificName, classForm, latitude, longitude, genericName, stateProvince, iucnRedListCategory, verbatimLocality,
    family, smallFileUpload) {
    const createdByUser = await createdBy.getUser(Meteor.userId());

    await Species.insertAsync({
      scientificName: scientificName,
      class: classForm,
      latitude: latitude,
      longitude: longitude,
      genericName: genericName,
      stateProvince: stateProvince,
      iucnRedListCategory: iucnRedListCategory,
      verbatimLocality: verbatimLocality,
      family: family,
      media: {
        identifier: smallFileUpload,
        creator: createdByUser
      },
      status: "pending",
      createdBy: createdByUser,
      createdAt: new Date()
    })
  },
  async "species.statusChange"(id, decision, note) {
    check(id, String);
    check(decision, String);
    let status = ""
    if (decision == "accepted") {
      status = "accepted"
    } else if (decision == "rejected") {
      status = "rejected"
    } else {
      throw new Meteor.Error("error al procesar solicitud de cambio de status");
    }

    await Species.updateAsync(
      { _id: id },
      { $set: {
        status: status,
        note: note
      } }
    );
  },
  async "species.photoStatusChange"(speciesId, photoIndex, newStatus) {
    check(speciesId, String);
    check(photoIndex, Number);
    check(newStatus, String);

    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    // Asegúrate de que el estado es 'accepted' o 'rejected'
    if (!["accepted", "rejected"].includes(newStatus)) {
      throw new Meteor.Error("invalid-status", "El estado debe ser 'accepted' o 'rejected'");
    }

    // Actualiza el estado de la foto específica en el array photosUsers
    const updateResult = await Species.updateAsync(
      { _id: speciesId, [`photosUsers.${photoIndex}.status`]: "pending" }, // Verifica que esté en "pending"
      { $set: { [`photosUsers.${photoIndex}.status`]: newStatus } }
    );

    if (updateResult === 0) {
      throw new Meteor.Error("update-failed", "No se pudo actualizar el estado de la foto");
    }
  }
});