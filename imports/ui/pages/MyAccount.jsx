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

  const { firstName, lastName, role } = user.profile;
  const email = user.emails[0].address;
  const verified = user.emails[0].verified ? "Sí" : "No";

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-center mb-4">Mi Cuenta</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Información Personal</h2>
          <p className="mt-2">
            <span className="font-medium">Nombre Completo: </span>
            {firstName} {lastName}
          </p>
          <p>
            <span className="font-medium">Correo Electrónico: </span>
            {email}
          </p>
          <p>
            <span className="font-medium">Rol: </span>
            {role.name}
          </p>
          <hr />
          <hr />
          <hr />
          <p className="text-center">
            <a className="hover:border-solid hover:border-b-2 border-[#20249b]" href="/">Ir a inicio</a>
          </p>
        </div>
        <button
          onClick={() => Meteor.logout()}
          className="w-full mt-4 p-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
      <Footer userRole={role.name} />
    </>
  );
};

export default MyAccount;
