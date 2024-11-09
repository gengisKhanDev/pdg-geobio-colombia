import React, { useState, useEffect, useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Species } from "/imports/api/species/species";
import MapView from "../components/MapView";
import { FilterCard } from "../components/FilterCard";
import FilterSidebar from "../components/FilterSidebar";
import SidebarController from "../components/SidebarController";
import SpeciesFilter from "../components/SpeciesFilter";
import { customAlert } from "../../startup/client/custom-alert.js";

const HomePage = () => {
  const sidebarRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scientificNameFilter, setScientificNameFilter] = useState("");
  const [stateProvinceFilter, setStateProvinceFilter] = useState("");
  const [iucnCategoryFilter, setIUCNCategoryFilter] = useState("");
  const [proximityFilter, setProximityFilter] = useState("yes");
  const [userLocation, setUserLocation] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState(60);
  const [enableClickForCoordinates, setEnableClickForCoordinates] =
    useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);

  const handleMapClick = (coordinates) => {
    if (enableClickForCoordinates) {
      setClickedCoordinates(coordinates);
    }
  };

  const handleCardClose = () => {
    setClickedCoordinates(null);
    setEnableClickForCoordinates(false);
  };

  const speciesData = useTracker(() => {
    const subscription = Meteor.subscribe("species.all");
    if (!subscription.ready()) return [];
    return Species.find().fetch();
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          customAlert(
            "error",
            "Por favor aceptar permitir ubicación en el navegador, se colocó el filtro predeterminado en Valle del Cauca:",
            3000
          );
          console.error("Error obteniendo la ubicación:", error);
          setProximityFilter("no");
          setStateProvinceFilter("Valle del Cauca");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  useEffect(() => {
    if (proximityFilter === "yes" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          customAlert(
            "error",
            "Por favor aceptar permitir ubicación en el navegador, se colocó el filtro predeterminado en Valle del Cauca:",
            3000
          );
          console.error(
            "Error obteniendo la ubicación al intentar activarla de nuevo:",
            error
          );
          setProximityFilter("no");
          setStateProvinceFilter("Valle del Cauca");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [proximityFilter]);

  if(proximityFilter === "no" && stateProvinceFilter === ""){
    customAlert(
      "success",
      "Se agrego prederminado el filtro del Valle del cauca:",
      3000
    );
    setStateProvinceFilter("Valle del Cauca");
  }

  const filteredSpecies = SpeciesFilter({
    speciesData,
    userLocation,
    scientificNameFilter,
    stateProvinceFilter,
    iucnCategoryFilter,
    proximityFilter,
    distanceFilter,
  });

  return (
    <div className="relative">
      <SidebarController
        sidebarRef={sidebarRef}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {!sidebarOpen && (
        <FilterCard
          onOpen={() => setSidebarOpen(true)}
          scientificName={scientificNameFilter}
          setScientificName={setScientificNameFilter}
          distanceFilter={distanceFilter}
          setDistanceFilter={setDistanceFilter}
          proximityFilter={proximityFilter}
          setProximityFilter={setProximityFilter}
          setEnableClickForCoordinates={setEnableClickForCoordinates}
          coordinates={clickedCoordinates} // Pass coordinates here
          onCloseCoordinates={handleCardClose} // Pass function to clear coordinates
        />
      )}
      {sidebarOpen && <div className="overlay"></div>}
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
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
      />
      <MapView
        speciesData={filteredSpecies}
        userLocation={userLocation}
        selectedDepartment={stateProvinceFilter}
        onMapClick={handleMapClick}
        enableClickForCoordinates={enableClickForCoordinates}
      />
    </div>
  );
};

export default HomePage;
