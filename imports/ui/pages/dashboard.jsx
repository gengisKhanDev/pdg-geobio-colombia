import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Species } from "/imports/api/species/species";
import MySpeciesSection from "../components/MySpeciesSection";
import RequestsSection from "../components/RequestsSection";
import PhotoRequestsSection from "../components/PhotoRequestsSection";
import Footer from "../components/Footer";

const Dashboard = () => {
  const user = useTracker(() => Meteor.user());
  const isAdmin = user?.profile?.role?.name === "Admin";

  const pendingSpecies = useTracker(() => {
    if (isAdmin) {
      Meteor.subscribe("species.pending");
      return Species.find({ status: "pending" }).fetch();
    }
    return [];
  }, [isAdmin]);

  const pendingPhotos = useTracker(() => {
    if (isAdmin) {
      Meteor.subscribe("species.photosPending"); // Para fotos

      const speciesWithPendingPhotos = Species.find(
        { "photosUsers.status": "pending" },
        { fields: { photosUsers: 1, _id: 1, scientificName: 1 } }
      ).fetch();

      const pendingPhotosArray = [];
      speciesWithPendingPhotos.forEach((species) => {
        species.photosUsers.forEach((photo, index) => {
          if (photo.status === "pending") {
            pendingPhotosArray.push({
              ...photo,
              speciesId: species._id,
              scientificName: species.scientificName,
              index, // Añade el índice para identificar la foto específica
            });
          }
        });
      });

      return pendingPhotosArray;
    }
    return [];
  }, [isAdmin]);

  const mySpecies = useTracker(() => {
    Meteor.subscribe("species.mySpecies");
    return Species.find({ "createdBy.id": Meteor.userId() }).fetch();
  }, []);

  if (!user) {
    return (
      <div className="pt-2 text-center">
        <p>Por favor, inicia sesión para ver tu cuenta.</p>
        <a
          href="/login"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Ir al Login
        </a>
      </div>
    );
  }

  return (
    <div className="dashboard max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      {isAdmin && (
        <>
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Solicitudes Agregar Especies
            </h2>
            <RequestsSection pendingSpecies={pendingSpecies} />
          </section>

          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Solicitudes Agregar Imágenes de Especies
            </h2>
            <PhotoRequestsSection pendingPhotos={pendingPhotos} />
          </section>
        </>
      )}

      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Mis Especies Agregadas
        </h2>
        <MySpeciesSection mySpecies={mySpecies} />
      </section>

      <Footer userRole={user.profile.firstName} />
    </div>
  );
};

export default Dashboard;
