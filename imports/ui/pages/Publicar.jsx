import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import Footer from "../components/Footer";

export function Publicar() {
  const user = useTracker(() => Meteor.user());

  if (!user) {
    return <div>Por favor, inicia sesión para ver tu cuenta.</div>;
  }
  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
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
      <Footer userRole={user.profile.role.name} />
    </>
  );
}
