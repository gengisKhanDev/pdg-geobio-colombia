import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Species } from "/imports/api/species/species";
import MapView from "../components/MapView";
import ScientificNameFilter from "../components/ScientificNameFilter";
import StateProvinceFilter from "../components/StateProvinceFilter";
import IUCNCategoryFilter from "../components/IUCNCategoryFilter";
import ProximityFilter from "../components/ProximityFilter";

const HomePage = () => {
  // Función para calcular la distancia entre dos puntos usando la fórmula del Haversine
  const haversineDistance = (coords1, coords2) => {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }

    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lon - coords1.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) *
        Math.cos(toRad(coords2.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 1000; // Retorna la distancia en metros
  };

  const [scientificNameFilter, setScientificNameFilter] = useState("");
  const [stateProvinceFilter, setStateProvinceFilter] = useState(""); // Filtro de departamento
  const [iucnCategoryFilter, setIUCNCategoryFilter] = useState("");
  const [proximityFilter, setProximityFilter] = useState("yes"); // Filtro de proximidad
  const [userLocation, setUserLocation] = useState(null);
  const [filteredSpecies, setFilteredSpecies] = useState([]);

  // Obtener las especies de la base de datos
  const speciesData = useTracker(() => {
    const subscription = Meteor.subscribe("species.all");
    if (!subscription.ready()) return [];
    return Species.find().fetch();
  });

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    }
  }, []);

  // Filtrar especies según la opción de proximidad y otros filtros
  useEffect(() => {
    if (userLocation || proximityFilter === "no") {
      const filtered = speciesData.filter((species) => {
        const speciesLocation = {
          lat: species.latitude,
          lon: species.longitude,
        };
        const distance = userLocation
          ? haversineDistance(userLocation, speciesLocation)
          : Infinity;

        return (
          (proximityFilter === "no" || distance <= 60000) && // Filtrar por distancia si el filtro está en "sí"
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

      setFilteredSpecies((prevFilteredSpecies) => {
        if (JSON.stringify(prevFilteredSpecies) !== JSON.stringify(filtered)) {
          return filtered;
        }
        return prevFilteredSpecies; // No actualizar si no hay cambios
      });
    }
  }, [
    userLocation,
    speciesData,
    scientificNameFilter,
    stateProvinceFilter,
    iucnCategoryFilter,
    proximityFilter,
  ]);

  return (
    <div>
      <h1>Species Map of the Pacific Region of Colombia</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <ProximityFilter
          value={proximityFilter}
          onChange={setProximityFilter}
        />
        <ScientificNameFilter
          value={scientificNameFilter}
          onChange={setScientificNameFilter}
        />
        <StateProvinceFilter
          value={stateProvinceFilter}
          onChange={setStateProvinceFilter}
        />
        <IUCNCategoryFilter
          value={iucnCategoryFilter}
          onChange={setIUCNCategoryFilter}
        />
      </div>

      {userLocation && (
        <MapView
          speciesData={filteredSpecies}
          userLocation={userLocation}
          selectedDepartment={stateProvinceFilter} // Pasar el departamento seleccionado a MapView
        />
      )}
    </div>
  );
};

export default HomePage;
