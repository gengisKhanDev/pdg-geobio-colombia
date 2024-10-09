import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Footer from "../components/Footer";

const MyAccount = () => {
  const user = useTracker(() => Meteor.user());

  if (!user) {
    return <div>Por favor, inicia sesión para ver tu cuenta.</div>;
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
