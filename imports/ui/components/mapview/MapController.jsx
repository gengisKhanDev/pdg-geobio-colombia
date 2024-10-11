import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { chocoCoords, valleDelCaucaCoords, caucaCoords, narinoCoords } from "../coordenadas.js";

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

export default MapController;
