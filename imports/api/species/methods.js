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
  "species.addPhoto"(speciesId, photo) {
    check(speciesId, String);
    check(photo, {
      image: String,
      uploadedBy: String,
      status: String,
    });
    console.log(photo)
    Species.update(
      { _id: speciesId },
      { $push: { photosUsers: photo } }
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
  }
});