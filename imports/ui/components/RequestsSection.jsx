// imports/ui/components/RequestsSection.jsx
import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { customAlert } from "../../startup/client/custom-alert.js";

const RequestsSection = ({ pendingSpecies }) => {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [note, setNote] = useState("");

  const handleViewSpecies = (species) => {
    setSelectedSpecies(species);
  };

  const handleDecision = (id, decision) => {

    Meteor.call("species.statusChange", id, decision, note, (error) => {
      if (error) {
        customAlert("error", "No se pudo cambiar el status!", 2000)
      } else {
        customAlert("success", "Acción fue exitosa!", 2000)
      }
    });

    console.log(decision); // accepted o rejected
    console.log(id); // accepted o rejected
    console.log("Nota del administrador:", note);
    setSelectedSpecies(null); // Cierra el modal
    setNote(""); // Limpia el área de nota
  };

  return (
    <div>
      {pendingSpecies.map((species) => (
        <div
          key={species._id}
          className="mb-4 flex justify-between items-center"
        >
          <Button
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            onClick={() => handleViewSpecies(species)}
          >
            ({species.scientificName}) - ({species.createdBy.name}) Ver Especie
          </Button>
        </div>
      ))}

      {selectedSpecies && (
        <Modal show={selectedSpecies} onClose={() => setSelectedSpecies(null)}>
          <Modal.Header>Detalles de la Solicitud</Modal.Header>
          <Modal.Body>
            <p>
              <strong>Nombre Científico:</strong>{" "}
              {selectedSpecies.scientificName}
            </p>
            <p>
              <strong>Clase:</strong> {selectedSpecies.class}
            </p>
            <p>
              <strong>Latitud:</strong> {selectedSpecies.latitude}
            </p>
            <p>
              <strong>Longitud:</strong> {selectedSpecies.longitude}
            </p>
            <p>
              <strong>Nombre Genérico:</strong> {selectedSpecies.genericName}
            </p>
            <p>
              <strong>Provincia:</strong> {selectedSpecies.stateProvince}
            </p>
            <p>
              <strong>Categoría IUCN:</strong>{" "}
              {selectedSpecies.iucnRedListCategory}
            </p>
            <p>
              <strong>Localidad Verbatim:</strong>{" "}
              {selectedSpecies.verbatimLocality}
            </p>
            <p>
              <strong>Familia:</strong> {selectedSpecies.family}
            </p>
            <img
              src={selectedSpecies.media?.identifier}
              alt="Imagen de la Especie"
              className="w-full h-48 object-cover mt-4"
            />
            <p>
              <strong>Agregado por:</strong> {selectedSpecies.createdBy.name}
            </p>

            <textarea
              className="w-full p-2 mt-4 border rounded"
              placeholder="Nota para el solicitante..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex justify-between mt-4">
              <Button
                color="success"
                onClick={() => handleDecision(selectedSpecies._id, "accepted")}
              >
                Aceptar
              </Button>
              <Button
                color="failure"
                onClick={() => handleDecision(selectedSpecies._id, "rejected")}
              >
                Rechazar
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default RequestsSection;
