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
            icon={L.divIcon({
              html: `
                <div class="rounded-full overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center">
                  <img src="${species.media?.identifier || "/icon-geobio.png"}" alt="${
                          species.scientificName
                        }" class="w-12 h-12 object-cover"/>
                </div>
              `,
              className: "", // Para eliminar estilos por defecto
              iconSize: [48, 48], // Tamaño del icono
              iconAnchor: [24, 48], // Ancla del icono
              popupAnchor: [0, -48], // Ancla del popup
            })}
          >
            <Popup>
              <div className="rounded-lg shadow-lg p-4 bg-white">
                <img
                  src={species.media?.identifier || "/icon-geobio.png"}
                  alt={species.scientificName}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="mt-2 text-center">
                  <b className="text-lg">{species.scientificName}</b>
                  <br />
                  <i className="text-sm text-gray-600">{species.family}</i>
                  <br />
                  <span className="text-sm text-gray-600">
                    Class: {species.class}
                  </span>
                  <br />
                  <span className="text-sm text-gray-600">
                    Location: {species.verbatimLocality},{" "}
                    {species.stateProvince}
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-500">
                    Photo by: {species.media?.creator}
                  </span>
                  <br />
                  <a
                    href={species.media?.references}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    View on iNaturalist
                  </a>
                </div>
                <div className="mt-4 text-center">
                  <Button
                    onClick={() => handleViewMoreClick(species)}
                    className="p-2 bg-blue-600 text-white rounded-full w-full"
                  >
                    View More
                  </Button>
                </div>
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
        <SpeciesModal
          species={selectedSpecies}
          onClose={() => setSelectedSpecies(null)}
        />
      )}
    </>
  );
};

export default MapView;
