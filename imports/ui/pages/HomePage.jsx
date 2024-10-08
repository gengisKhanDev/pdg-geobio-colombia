import React, { useState, useEffect, useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Species } from "/imports/api/species/species";
import MapView from "../components/MapView";
import "flowbite";
import { FilterCard } from "../components/FilterCard";
import FilterSidebar from "../components/FilterSidebar";

const HomePage = () => {
  const sidebarRef = useRef(null); // Ref for the sidebar
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

  const [sidebarOpen, setSidebarOpen] = useState(false); // Control del sidebar
  const [scientificNameFilter, setScientificNameFilter] = useState("");
  const [stateProvinceFilter, setStateProvinceFilter] = useState("");
  const [iucnCategoryFilter, setIUCNCategoryFilter] = useState("");
  const [proximityFilter, setProximityFilter] = useState("yes");
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

  useEffect(() => {
    function handleClickOutside(event) {
      // Ensure that the ref is checking the wrapper div, not the Sidebar component
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false); // Close sidebar when clicking outside
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Filtrar especies según los filtros
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
          (proximityFilter === "no" || distance <= 60000) &&
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
        return prevFilteredSpecies;
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
    <div className="relative">
      {/* Botón flotante sobre el mapa para abrir/cerrar el sidebar */}
      {!sidebarOpen && <FilterCard
          onOpen={() => setSidebarOpen(true)}
          scientificName={scientificNameFilter}
          setScientificName={setScientificNameFilter}
        />}
      {/* Agregar overlay solo cuando el sidebar está abierto */}
      {sidebarOpen && <div className="overlay"></div>}

      {/* Sidebar con clases dinámicas para abrir o cerrar */}
      <FilterSidebar
        ref={sidebarRef}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        proximityFilter={proximityFilter}
        setProximityFilter={setProximityFilter}
        scientificNameFilter={scientificNameFilter}
        setScientificNameFilter={setScientificNameFilter}
        stateProvinceFilter={stateProvinceFilter}
        setStateProvinceFilter={setStateProvinceFilter}
        iucnCategoryFilter={iucnCategoryFilter}
        setIUCNCategoryFilter={setIUCNCategoryFilter}
      />

      {/* Mapa */}
      <MapView
        speciesData={filteredSpecies}
        userLocation={userLocation}
        selectedDepartment={stateProvinceFilter} // Pasar el departamento seleccionado a MapView
      />
    </div>
  );
};

export default HomePage;
