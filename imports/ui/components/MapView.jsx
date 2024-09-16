import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { chocoCoords, valleDelCaucaCoords, caucaCoords, narinoCoords, worldCoords, colombiaCoords } from "./coordenadas.js";

const MapView = ({ speciesData, userLocation, selectedDepartment }) => {
  const center = userLocation
    ? [userLocation.lat, userLocation.lon]
    : [3.42158, -76.5205];
  const zoomLevel = 8;

  const polygonOptions = {
    color: "green",
    fillColor: "lightgreen",
    fillOpacity: 0.5,
  };

  const darkOverlayOptions = {
    color: "black",
    fillColor: "black",
    fillOpacity: 0.9,
    stroke: false,
  };

  // Función para dibujar todos los polígonos por defecto
  const drawAllPolygons = () => (
    <>
      <Polygon pathOptions={polygonOptions} positions={chocoCoords} />
      <Polygon pathOptions={polygonOptions} positions={valleDelCaucaCoords} />
      <Polygon pathOptions={polygonOptions} positions={caucaCoords} />
      <Polygon pathOptions={polygonOptions} positions={narinoCoords} />
    </>
  );

  // Función para obtener los polígonos dependiendo del departamento seleccionado
  const getPolygonCoords = () => {
    switch (selectedDepartment) {
      case "Cauca":
        return <Polygon pathOptions={polygonOptions} positions={caucaCoords} />;
      case "Chocó":
        return <Polygon pathOptions={polygonOptions} positions={chocoCoords} />;
      case "Nariño":
        return <Polygon pathOptions={polygonOptions} positions={narinoCoords} />;
      case "Valle del Cauca":
        return (
          <Polygon pathOptions={polygonOptions} positions={valleDelCaucaCoords} />
        );
      default:
        return drawAllPolygons();
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={zoomLevel}
      style={{ height: "100vh", width: "100vw" }}  // Ocupar toda la pantalla
      minZoom={5}
      maxBounds={colombiaCoords}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Mostrar el polígono del departamento seleccionado o todos los polígonos */}
      {getPolygonCoords()}

      {/* Mostrar la ubicación del usuario */}
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

      {/* Mostrar marcadores de especies */}
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
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
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
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Capa oscura en todo el mundo excepto Colombia */}
      <Polygon
        pathOptions={darkOverlayOptions}
        positions={[worldCoords, colombiaCoords]}
      />
    </MapContainer>
  );
};

export default MapView;
