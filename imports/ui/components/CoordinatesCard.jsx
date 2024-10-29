// components/CoordinatesCard.jsx
import React, { useState } from "react";
import { Card } from "flowbite-react";

const CoordinatesCard = ({ coordinates, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation(); // Prevents the map click event from triggering
    if (coordinates) { // Check if coordinates exist
      navigator.clipboard.writeText(`${coordinates.lat}, ${coordinates.lng}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the "Copied!" message after 2 seconds
    }
  };

  return (
    <Card className="absolute bottom-4 left-4 max-w-sm bg-white shadow-lg rounded-lg target-coordinate"
          onClick={(e) => e.stopPropagation()}> {/* Prevents the card click event from triggering map events */}
      <div className="p-4">
        <p className="text-sm text-gray-800 mb-2">
          {coordinates
            ? `Coordinates: ${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`
            : "Click on the map to get coordinates"}
        </p>
        {coordinates && (
          <button
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
        <button
          className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </Card>
  );
};

export default CoordinatesCard;
