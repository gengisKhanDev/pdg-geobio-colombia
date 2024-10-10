import { Meteor } from "meteor/meteor";
import { Species } from "./species";
import { check } from "meteor/check";

import axios from "axios";

const GBIF_API_URL = "https://api.gbif.org/v1/occurrence/search";

Meteor.methods({
  async "species.fetchFromGBIF"() {
    this.unblock(); // Permite que otras llamadas al método no esperen por este resultado.

    try {
      const response = await axios.get(GBIF_API_URL, {
        params: {
          country: "CO", // Código de país para Colombia
          decimalLatitude: "1.396967,6.253041", // Rango de latitudes para la región del Pacífico colombiano
          decimalLongitude: "-78.189532,-76.5205", // Rango de longitudes para la región del Pacífico colombiano
          taxonKey: 1, // Filtro por reino animal
          limit: 300 // Número máximo de resultados por solicitud
        }
      });

      if(!response.data || !response.data.results){
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
      for(let specimen of species){
        await Species.insertAsync(specimen);
      }

      return species;

    }
    catch (error){
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
    // Species.update(
    //   { _id: speciesId },
    //   { $push: { photosUsers: photo } }
    // );
  },
});