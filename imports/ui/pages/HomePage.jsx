import React, { useState, useEffect, useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Species } from "/imports/api/species/species";
import MapView from "../components/MapView";
import { FilterCard } from "../components/FilterCard";
import FilterSidebar from "../components/FilterSidebar";
import SidebarController from "../components/SidebarController";
import SpeciesFilter from "../components/SpeciesFilter";

const HomePage = () => {
  const sidebarRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scientificNameFilter, setScientificNameFilter] = useState("");
  const [stateProvinceFilter, setStateProvinceFilter] = useState("");
  const [iucnCategoryFilter, setIUCNCategoryFilter] = useState("");
  const [proximityFilter, setProximityFilter] = useState("yes");
  const [userLocation, setUserLocation] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState(60);
  const [enableClickForCoordinates, setEnableClickForCoordinates] = useState(false);
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
          console.error("Error obteniendo la ubicación:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

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
