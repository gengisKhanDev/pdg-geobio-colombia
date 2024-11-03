import React from "react";
import UploadPhoto from "./UploadPhoto";
import { Modal, Button } from "flowbite-react";

const SpeciesModal = ({ species, onClose }) => {
  const user = Meteor.user();

  // Filtra las fotos con estado "accepted"
  const acceptedPhotos = species.photosUsers?.filter(photo => photo.status === "accepted");

  const handleUploadSuccess = () => {
    onClose(); // Cierra el modal después de subir una foto con éxito
  };

  return (
    <Modal className="modal-bg" show={!!species} onClose={onClose} size="lg">
      <Modal.Header>{species?.scientificName}</Modal.Header>
      <Modal.Body>
        <p>Familia: {species?.family}</p>
        <p>Ubicación: {species?.verbatimLocality}</p>

        {/* Mostrar fotos aceptadas */}
        {acceptedPhotos && acceptedPhotos.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Fotos Aceptadas</h3>
            <div className="grid grid-cols-1 gap-4 mt-2">
              {acceptedPhotos.map((photo, index) => (
                <div key={index} className="text-center">
                  <img
                    src={photo.image}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Subida por: {photo.createdby?.name || "Usuario desconocido"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-4">No hay fotos aceptadas para esta especie.</p>
        )}

        {/* Opciones de subir foto para usuarios autenticados */}
        {user ? (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Subir una foto</h3>
            <UploadPhoto speciesId={species._id} onSuccess={handleUploadSuccess} />
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
