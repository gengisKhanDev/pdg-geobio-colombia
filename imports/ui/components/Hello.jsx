import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

export const Hello = () => {
  const [speciesData, setSpeciesData] = useState([]);

  const handleClick = () => {
    const latitude = 3.42158;
    const longitude = -76.5205;
    const radius = 100;
    Meteor.call("species.fetchFromGBIF", latitude, longitude, radius, (error, result) => {
      if(error){
        console.error("Error fetching species:", error);
      }
      else {
        console.log("Fetched species:", result);
        setSpeciesData(result); // Guardar los datos en el estado para mostrar
      }
    });
  };

  return (
    <div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleClick}>Click to Fetch</button>
      <div>
        <h2>Species Data:</h2>
        <pre>{JSON.stringify(speciesData, null, 2)}</pre>
      </div>
    </div>
  );
};
