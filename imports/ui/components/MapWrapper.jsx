import React from "react";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";

function MapWrapper() {
  // Coordenadas de las esquinas del área (latitud y longitud)
  const bounds = [
    [1.396967, -78.189532], // Esquina inferior izquierda
    [6.253041, -76.5205],   // Esquina superior derecha
  ];

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer style={{ height: "100%" }} center={[3.825004, -77.355016]} zoom={7}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Rectángulo que representa el área cubierta por las coordenadas */}
        <Rectangle bounds={bounds} color="blue" />
      </MapContainer>
    </div>
  );
}

export default MapWrapper;
