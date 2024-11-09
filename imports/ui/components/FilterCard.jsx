import React, { useState } from "react";
import { Card } from "flowbite-react";
import ScientificNameFilter from "./sidebar/ScientificNameFilter";
import DistanceFilter from "./sidebar/DistanceFilter";
import ProximityFilter from "./sidebar/ProximityFilter";
import { useTracker } from "meteor/react-meteor-data";
import { HiMenu, HiUser, HiLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";

export function FilterCard({
  onOpen,
  scientificName,
  setScientificName,
  setDistanceFilter,
  distanceFilter,
  proximityFilter,
  setProximityFilter,
  setEnableClickForCoordinates,
  coordinates,
  onCloseCoordinates,
}) {
  const user = useTracker(() => Meteor.user()); // Estado del usuario
  const navigate = useNavigate(); // Para la navegación entre páginas

  const [isSelectingCoordinates, setIsSelectingCoordinates] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLocationMarkerClick = () => {
    const newValue = !isSelectingCoordinates;
    setIsSelectingCoordinates(newValue);
    setEnableClickForCoordinates(newValue);
    if (!newValue) {
      onCloseCoordinates(); // Clear coordinates when turning off selection
    }
  };

  const handleCopy = () => {
    if (coordinates) {
      navigator.clipboard.writeText(
        `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    }
  };

  const handleLoginClick = () => {
    if (user) {
      navigate("/myaccount"); // Si el usuario está logueado, va a "My Account"
    } else {
      navigate("/login"); // Si no está logueado, lo lleva a la página de Login
    }
  };
  return (
    <Card className="max-w-sm shadow-green-500/50 absolute top-4 left-4 p-2 bg-slate-100 text-black rounded-md shadow-lg button-top">
      <div className="flex items-center space-x-2">
        <Tooltip content="Click para abrir todos los filtros">
          <HiMenu size={24} className="cursor-pointer mr-4" onClick={onOpen} />
        </Tooltip>
        <Tooltip content="Click para iniciar sesión o entrar en cuenta">
          <HiUser
            size={24}
            className="cursor-pointer mr-4"
            onClick={handleLoginClick}
          />
        </Tooltip>
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-black">
          Filtros
        </h5>
      </div>
      <ScientificNameFilter
        value={scientificName}
        onChange={setScientificName}
      />
      <ProximityFilter value={proximityFilter} onChange={setProximityFilter} />
      {proximityFilter === "yes" && (
        <DistanceFilter className="ml-4" value={distanceFilter} onChange={setDistanceFilter} />
      )}
      <div className="flex items-center space-x-2">
        <Tooltip content="Click para activar(azul) y poder sacar coordendas de un punto en el mapa.">
          <HiLocationMarker
            size={24}
            className={`cursor-pointer mr-4 ${
              isSelectingCoordinates ? "text-blue-500" : ""
            }`}
            onClick={handleLocationMarkerClick}
          />
        </Tooltip>
      </div>
      {isSelectingCoordinates && coordinates && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-center">
          <p className="text-sm text-gray-800">
            Coordinates: {coordinates.lat.toFixed(5)},{" "}
            {coordinates.lng.toFixed(5)}
          </p>
          <button
            className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 mt-2"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </Card>
  );
}
