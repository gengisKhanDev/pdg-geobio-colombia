import { Meteor } from 'meteor/meteor';
import { Species } from './species';
import axios from 'axios';

const GBIF_API_URL = 'https://api.gbif.org/v1/occurrence/search';

Meteor.methods({
  async 'species.fetchFromGBIF'() {
    this.unblock(); // Permite que otras llamadas al método no esperen por este resultado.

    try {
      const response = await axios.get(GBIF_API_URL, {
        params: {
          country: 'CO', // Código de país para Colombia
          decimalLatitude: '1.396967,6.253041', // Rango de latitudes para la región del Pacífico colombiano
          decimalLongitude: '-78.189532,-76.5205', // Rango de longitudes para la región del Pacífico colombiano
          taxonKey: 1, // Filtro por reino animal
          limit: 300 // Número máximo de resultados por solicitud
        }
      });

      // console.log('Full API response:', response.data);  // Imprime la respuesta completa

      if (!response.data || !response.data.results) {
        throw new Meteor.Error('GBIF API response missing results');
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
      // return species;

    } catch (error) {
      console.error('Error in GBIF API request:', error);
      throw new Meteor.Error('GBIF API request failed', error.message);
    }
  },
  'species.insert'(data) {

    const GBIF_API_URL = 'https://api.gbif.org/v1/occurrence/search';

    async function fetchSpeciesFromGBIF(latitude, longitude, radius) {
      try {
        const response = await axios.get(GBIF_API_URL, {
          params: {
            decimalLatitude: latitude,
            decimalLongitude: longitude,
            radius: radius,
            kingdom: 'Animalia', // Filtrar solo animales
            limit: 100 // Número máximo de resultados por solicitud
          }
        });
        const species = response.data.results.map(result => ({
          scientificName: result.scientificName,
          commonName: result.vernacularName,
          gbifID: result.speciesKey,
          latitude: result.decimalLatitude,
          longitude: result.decimalLongitude,
        }));

        return species;

      } catch (error) {
        console.error('Error fetching data from GBIF:', error);
        return [];
      }
    }

    const IUCN_API_URL = 'https://apiv3.iucnredlist.org/api/v3/species';

    async function fetchSpeciesDataFromIUCN(scientificName, token) {
      try {
        const response = await axios.get(`${IUCN_API_URL}/${scientificName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const speciesData = response.data.result[0];

        return {
          iucnStatus: speciesData.category,
          populationTrend: speciesData.population_trend,
          habitat: speciesData.habitat,
          threats: speciesData.threats
        };

      } catch (error) {
        console.error(`Error fetching data from IUCN for ${scientificName}:`, error);
        return {
          iucnStatus: 'Not Evaluated',
          populationTrend: 'Unknown',
          habitat: 'Unknown',
          threats: 'Unknown'
        };
      }
    }

    async function fetchAndCombineSpeciesData(latitude, longitude, radius, iucnToken) {
      const gbifSpecies = await fetchSpeciesFromGBIF(latitude, longitude, radius);

      const combinedSpeciesData = await Promise.all(gbifSpecies.map(async (species) => {
        const iucnData = await fetchSpeciesDataFromIUCN(species.scientificName, iucnToken);

        return {
          ...species,
          ...iucnData,
        };
      }));

      return combinedSpeciesData;
    }

    const LATITUDE = 3.42158; // Ejemplo de coordenadas para la región del Pacífico colombiano
    const LONGITUDE = -76.5205;
    const RADIUS = 100; // Ejemplo de radio en kilómetros
    const IUCN_TOKEN = 'your-iucn-api-token-here';

    fetchAndCombineSpeciesData(LATITUDE, LONGITUDE, RADIUS, IUCN_TOKEN).then((combinedData) => {
      console.log('Combined Species Data:', combinedData);
    });


    // Species.insert(data);
  },
  'species.fetch'(query) {
    return Species.find(query).fetch();
  }
});