import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate
import { useTracker } from 'meteor/react-meteor-data';

const LoginPage = () => {
  const user = useTracker(() => Meteor.user());

  if (user) {
    window.location.href = '/homepage';
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Updated hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        alert('Error al iniciar sesión: ' + error.reason);
      } else {
        // Redirige al usuario a la página principal
        navigate("/homepage"); // Updated to navigate to home page

        // window.location.href = '/homepage';
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
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

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password:
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

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
