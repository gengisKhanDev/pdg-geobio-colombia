import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Button } from "flowbite-react";

const SpeciesMarker = ({ species, onViewMore }) => {
  // Excluir especies que tengan status "pending"
  if (species.status === "pending" || species.status === "rejected") {
    return null;
  }

  return (
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
        className: "",
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
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
              Location: {species.verbatimLocality || "N/A"}, {species.stateProvince}
            </span>
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-gray-500">
              Photo by: {typeof species.media?.creator === "object" ? species.media.creator.name : species.media?.creator}
            </span>
            <br />
            {species.media?.references && (
              <a
                href={species.media.references}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View on iNaturalist
              </a>
            )}
          </div>
          <div className="mt-4 text-center">
            <Button
              onClick={() => onViewMore(species)}
              className="p-2 bg-blue-600 text-white rounded-full w-full"
            >
              Ver más
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default SpeciesMarker;
