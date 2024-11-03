import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Footer from "../components/Footer";

const MyAccount = () => {
  const user = useTracker(() => Meteor.user());

  if (!user) {
    return (
      <div className="pt-2">
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
        <h1 className="text-2xl font-bold">Mi Cuenta</h1>
        <p>Correo electrónico: {user.emails[0].address}</p>
        <button
          onClick={() => Meteor.logout()}
          className="p-2 bg-red-600 text-white rounded"
        >
          Cerrar sesión
        </button>
      </div>
      <Footer userRole={user.profile.role.name} />
    </>
  );
};

export default MyAccount;
