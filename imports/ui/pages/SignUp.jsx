import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { customAlert } from "../../startup/client/custom-alert.js";

const SignUp = () => {
  const user = useTracker(() => Meteor.user());

  if (user) {
    window.location.href = "/";
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    Meteor.call(
      "users.signup",
      firstName,
      lastName,
      email,
      password,
      role,
      (error, result) => {
        if (error) {
          if (error.reason) {
            customAlert("error", error.reason, 3000);
          } else {
            customAlert(
              "error",
              "Error al crear usuario: " + error.message,
              3000
            );
          }
        } else {
          customAlert("success", "Usuario creado, inicia sesión!", 3000);
          navigate("/login");
        }
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-1 flex-row gap-2 mb-4">
            <div className="my-2">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium"
              >
                Primer Nombre:
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium"
              >
                Primer Apellido:
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-1 flex-row gap-2 mb-4">
            <div className="my-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Correo Electrónico:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Contraseña:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Elige Rol:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="User">Usuario</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
          <hr />
          <a href="/login">
            <h3>Ir a Iniciar Sesión</h3>
          </a>
          <hr />
          <a href="/">
            <h3>Inicio</h3>
          </a>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
