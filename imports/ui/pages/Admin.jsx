import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Footer from "../components/Footer";

const Admin = () => {
  const [speciesData, setSpeciesData] = useState([]);
  const user = useTracker(() => Meteor.user());

  const handleClick = () => {
    const latitude = 3.42158;
    const longitude = -76.5205;
    const radius = 100;
    Meteor.call(
      "species.fetchFromGBIF",
      latitude,
      longitude,
      radius,
      (error, result) => {
        if (error) {
          console.error("Error fetching species:", error);
        } else {
          console.log("Fetched species:", result);
          setSpeciesData(result); // Guardar los datos en el estado para mostrar
        }
      }
    );
  };

  if (!user) {
    return (
      <div>
        Por favor, inicia sesión para ver tu cuenta.
        <a
          href="/login"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Ir al Login
        </a>
      </div>
    );
  }
  return (
    <>
      <div className="p-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={handleClick}
        >
          Click para agregar especies
        </button>
        <div>
          <h2>Especies Datos:</h2>
          <pre>{JSON.stringify(speciesData, null, 2)}</pre>
        </div>
      </div>
      <Footer userRole={user.profile.role.name} />
    </>
  );
};

export default Admin;
