// components/SpeciesFilter.jsx
import { useMemo } from "react";
import { haversineDistance } from "./utils/haversine";

const SpeciesFilter = ({
  speciesData,
  userLocation,
  scientificNameFilter,
  stateProvinceFilter,
  iucnCategoryFilter,
  proximityFilter,
  distanceFilter,
}) => {
  const filteredSpecies = useMemo(() => {
    if (userLocation || proximityFilter === "no") {
      return speciesData.filter((species) => {
        const speciesLocation = {
          lat: species.latitude,
          lon: species.longitude,
        };
        const distance = userLocation
          ? haversineDistance(userLocation, speciesLocation)
          : Infinity;

        return (
          (proximityFilter === "no" || distance <= distanceFilter * 1000) &&
          (!scientificNameFilter ||
            species.scientificName
              .toLowerCase()
              .includes(scientificNameFilter.toLowerCase())) &&
          (!stateProvinceFilter ||
            species.stateProvince === stateProvinceFilter) &&
          (!iucnCategoryFilter ||
            species.iucnRedListCategory === iucnCategoryFilter ||
            (iucnCategoryFilter === "NE" && !species.iucnRedListCategory))
        );
      });
    }
    return [];
  }, [
    userLocation,
    speciesData,
    scientificNameFilter,
    stateProvinceFilter,
    iucnCategoryFilter,
    proximityFilter,
    distanceFilter,
  ]);

  return filteredSpecies;
};

export default SpeciesFilter;
