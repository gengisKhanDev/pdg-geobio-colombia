import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import { Modal, Button } from "flowbite-react";
import "leaflet/dist/leaflet.css";
import {
  chocoCoords,
  valleDelCaucaCoords,
  caucaCoords,
  narinoCoords,
  worldCoords,
  colombiaCoords,
  limitColombia,
} from "./coordenadas.js";
import SpeciesModal from "./SpeciesModal";

const pixelPatternUrl =
  "data:image/svg+xml;base64," +
  btoa(`
  <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="4" height="4" fill="black" />
    <rect x="6" y="6" width="4" height="4" fill="black" />
  </svg>
`);

const MapController = ({ selectedDepartment }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = {
      Cauca: L.latLngBounds(caucaCoords),
      Chocó: L.latLngBounds(chocoCoords),
      Nariño: L.latLngBounds(narinoCoords),
      "Valle del Cauca": L.latLngBounds(valleDelCaucaCoords),
      All: L.latLngBounds([
        [1.396967, -78.189532],
        [6.253041, -76.5205],
      ]),
    };

    if (selectedDepartment && bounds[selectedDepartment]) {
      map.flyToBounds(bounds[selectedDepartment], { duration: 1.5 });
    }
  }, [selectedDepartment, map]);

  return null;
};

const MapView = ({ speciesData, userLocation, selectedDepartment }) => {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const center = userLocation
    ? [userLocation.lat, userLocation.lon]
    : [3.42158, -76.5205];
  const zoomLevel = 7;

  const polygonOptions = {
    color: "green",
    fillColor: "lightgreen",
    weight: 5,
    stroke: true,
    fillOpacity: 0.5,
  };

  const darkOverlayOptions = {
    color: "black",
    fillColor: "black",
    weight: 1,
    fillOpacity: 0.9,
    stroke: false,
  };

  const darkOverlayOutpout = {
    color: "green",
    fillColor: "black",
    weight: 3,
    fillOpacity: 0.4,
    stroke: true,
  };

  const handleModalClose = () => setIsModalOpen(false);
  const handleViewMoreClick = (species) => {
    console.log("View More clicked for:", species.scientificName);
    setSelectedSpecies(species);
    setIsModalOpen(true);
  };
  const drawAllPolygons = () => (
    <>
      <Polygon pathOptions={polygonOptions} positions={chocoCoords} />
      <Polygon pathOptions={polygonOptions} positions={valleDelCaucaCoords} />
      <Polygon pathOptions={polygonOptions} positions={caucaCoords} />
      <Polygon pathOptions={polygonOptions} positions={narinoCoords} />
      <Polygon
        pathOptions={{
          ...darkOverlayOutpout,
          fillPatternUrl: pixelPatternUrl,
        }}
        positions={[
          colombiaCoords,
          chocoCoords,
          valleDelCaucaCoords,
          caucaCoords,
          narinoCoords,
        ]}
      />
    </>
  );

  const getPolygonCoords = () => {
    switch (selectedDepartment) {
      case "Cauca":
        return (
          <Polygon
            pathOptions={{
              ...darkOverlayOutpout,
              fillPatternUrl: pixelPatternUrl,
            }}
            positions={[colombiaCoords, caucaCoords]}
          />
        );
      case "Chocó":
        return (
          <Polygon
            pathOptions={{
              ...darkOverlayOutpout,
              fillPatternUrl: pixelPatternUrl,
            }}
            positions={[colombiaCoords, chocoCoords]}
          />
        );
      case "Nariño":
        return (
          <Polygon
            pathOptions={{
              ...darkOverlayOutpout,
              fillPatternUrl: pixelPatternUrl,
            }}
            positions={[colombiaCoords, narinoCoords]}
          />
        );
      case "Valle del Cauca":
        return (
          <Polygon
            pathOptions={{
              ...darkOverlayOutpout,
              fillPatternUrl: pixelPatternUrl,
            }}
            positions={[colombiaCoords, valleDelCaucaCoords]}
          />
        );
      default:
        return drawAllPolygons();
    }
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoomLevel}
        style={{ height: "100vh", width: "100vw" }}
        minZoom={5}
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
        {getPolygonCoords()}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lon]}
            icon={L.icon({
              iconUrl: "/user-icon-map.png",
              iconSize: [20, 20],
              iconAnchor: [20, 40],
              popupAnchor: [0, -40],
            })}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}
        {speciesData.map((species) => (
          <Marker
            key={species._id}
            position={[species.latitude, species.longitude]}
            icon={L.icon({
              iconUrl: species.media?.identifier || "/icon-geobio.png",
              iconSize: [50, 50],
              iconAnchor: [25, 50],
              popupAnchor: [0, -50],
            })}
          >
            <Popup>
              <div>
                <b>{species.scientificName}</b>
                <br />
                <i>{species.family}</i>
                <br />
                <span>Class: {species.class}</span>
                <br />
                <span>
                  Location: {species.verbatimLocality}, {species.stateProvince}
                </span>
                <br />
                <img
                  src={species.media?.identifier || "/icon-geobio.png"}
                  alt={species.scientificName}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <br />
                <span>Photo by: {species.media?.creator}</span>
                <br />
                <a
                  href={species.media?.references}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on iNaturalist
                </a>
                <br />
                <Button
                  onClick={() => handleViewMoreClick(species)}
                  className="p-2 bg-blue-600 text-white rounded mt-4"
                >
                  View More
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
        <Polygon
          pathOptions={darkOverlayOptions}
          positions={[worldCoords, colombiaCoords]}
        />
        <ZoomControl position={"topright"} />
      </MapContainer>
      {selectedSpecies && (
        <SpeciesModal species={selectedSpecies} onClose={() => setSelectedSpecies(null)} />
      )}
    </>
  );
};

export default MapView;