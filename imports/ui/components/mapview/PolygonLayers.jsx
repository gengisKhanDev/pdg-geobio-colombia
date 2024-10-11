// mapview/PolygonLayers.jsx
import React from "react";
import { Polygon } from "react-leaflet";
import {
  chocoCoords,
  valleDelCaucaCoords,
  caucaCoords,
  narinoCoords,
  colombiaCoords,
} from "../coordenadas.js";

const PolygonLayers = ({ selectedDepartment }) => {
  const polygonOptions = {
    color: "green",
    fillColor: "lightgreen",
    weight: 5,
    stroke: true,
    fillOpacity: 0.5,
  };

  const darkOverlayOutpout = {
    color: "green",
    fillColor: "black",
    weight: 3,
    fillOpacity: 0.4,
    stroke: true,
  };

  const pixelPatternUrl =
    "data:image/svg+xml;base64," +
    btoa(`
      <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="4" height="4" fill="black" />
        <rect x="6" y="6" width="4" height="4" fill="black" />
      </svg>
    `);

  // Función para obtener los polígonos basados en el departamento seleccionado
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
        // Dibujar todos los polígonos por defecto
        return (
          <>
            <Polygon pathOptions={polygonOptions} positions={chocoCoords} />
            <Polygon
              pathOptions={polygonOptions}
              positions={valleDelCaucaCoords}
            />
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
    }
  };

  return <>{getPolygonCoords()}</>;
};

export default PolygonLayers;
