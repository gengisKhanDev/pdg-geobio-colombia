import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Footer from "../components/Footer";
import { Users } from "/imports/api/users/users";
import { Button } from "flowbite-react";

const Admin = () => {
  const [speciesData, setSpeciesData] = useState([]);
  const user = useTracker(() => Meteor.user());

  const users = useTracker(() => {
    const subscription = Meteor.subscribe("users.all");
    if (!subscription.ready()) return [];
    return Users.find().fetch();
  });

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
          setSpeciesData(result);
        }
      }
    );
  };

  const handleClickDelete = () => {
    Meteor.call("species.fetchFromGBIFDelete", (error, result) => {
      if (error) {
        console.error("Error fetching species:", error);
      } else {
        console.log("Fetched species:", result);
        setSpeciesData(result);
      }
    });
  };

  const handleClickDeleteUser = (id) => {
    Meteor.call("users.deteleteUser", id, (error, result) => {
      if (error) {
        console.error("Error fetching species:", error);
      } else {
        console.log("Fetched species:", result);
      }
    });
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

  if (user.profile.firstName != "Super Admin") {
    return (
      <div>
        No tienes permisos para ver esta página.
        <a
          href="/"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Ir al inicio
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
        <button
          className="px-4 mx-4 py-2 bg-red-600 text-white rounded-lg"
          onClick={handleClickDelete}
        >
          Click para borrar
        </button>
        {users.map((user) => (
          <div
            key={user._id}
            className="my-4 flex justify-between items-center"
          >
            <Button
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              onClick={() => handleClickDeleteUser(user._id)}
            >
              Eliminar Usuario: {user.profile.firstName} {user.profile.lastName}
            </Button>
          </div>
        ))}
        <div>
          <h2>Especies Datos:</h2>
          <pre>{JSON.stringify(speciesData, null, 2)}</pre>
        </div>
      </div>
      <Footer userRole={user.profile.firstName} />
    </>
  );
};

export default Admin;
