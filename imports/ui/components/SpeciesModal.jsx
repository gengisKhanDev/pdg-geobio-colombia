import React, { useState } from "react";
import UploadPhoto from "./UploadPhoto";
import { Modal, Button } from "flowbite-react"; // Asegúrate de tener el componente de Flowbite

const SpeciesModal = ({ species, onClose }) => {
  const user = Meteor.user(); // Obtener el usuario autenticado

  return (
    <Modal className="modal-bg" show={!!species} onClose={onClose} size="lg">
      <Modal.Header>{species?.scientificName}</Modal.Header>
      <Modal.Body>
        <p>Familia: {species?.family}</p>
        <p>Ubicación: {species?.verbatimLocality}</p>
        {/* Mostrar la opción de subir foto solo si el usuario está autenticado */}
        {user ? (
          <div>
            <h3 className="text-lg font-bold">Subir una foto</h3>
            <UploadPhoto speciesId={species._id} />
          </div>
        ) : (
          <p>Inicia sesión para subir una foto.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SpeciesModal;
