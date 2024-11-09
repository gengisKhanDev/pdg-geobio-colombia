import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { worldCoords, colombiaCoords, limitColombia } from "./coordenadas.js";
import SpeciesModal from "./mapview/SpeciesModal";
import MapController from "./mapview/MapController";
import SpeciesMarker from "./mapview/SpeciesMarker";
import UserLocationMarker from "./mapview/UserLocationMarker";
import PolygonLayers from "./mapview/PolygonLayers";

const MapView = ({ speciesData, userLocation, selectedDepartment, onMapClick, enableClickForCoordinates }) => {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const center = userLocation
    ? [userLocation.lat, userLocation.lon]
    : [3.42158, -76.5205];

  const darkOverlayOptions = {
    color: "black",
    fillColor: "black",
    weight: 1,
    fillOpacity: 0.9,
    stroke: false,
  };

  const handleModalClose = () => setIsModalOpen(false);
  const handleViewMoreClick = (species) => {
    setSelectedSpecies(species);
    setIsModalOpen(true);
  };


  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (enableClickForCoordinates && onMapClick) {
          onMapClick(e.latlng);
        }
      },
    });
    return null;
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={7}
        style={{ height: "100vh", width: "100vw" }}
        minZoom={5}
        maxZoom={22}
        maxBounds={limitColombia}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController selectedDepartment={selectedDepartment} />
        <PolygonLayers selectedDepartment={selectedDepartment} />
        {userLocation && <UserLocationMarker userLocation={userLocation} />}
        {speciesData.map((species) => (
          <SpeciesMarker
            key={species._id}
            species={species}
            onViewMore={handleViewMoreClick}
          />
        ))}
        <MapClickHandler />
        <Polygon
          pathOptions={darkOverlayOptions}
          positions={[worldCoords, colombiaCoords]}
        />
        <ZoomControl position={"topright"} />
      </MapContainer>
      {selectedSpecies && (
        <SpeciesModal
          species={selectedSpecies}
          onClose={() => setSelectedSpecies(null)}
        />
      )}
    </>
  );
};

export default MapView;
