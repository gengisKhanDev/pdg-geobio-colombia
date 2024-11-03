import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { customAlert } from "../../startup/client/custom-alert.js";

const PhotoRequestsSection = ({ pendingPhotos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleViewPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleDecision = (speciesId, photoIndex, decision) => {
    Meteor.call(
      "species.photoStatusChange",
      speciesId,
      photoIndex,
      decision,
      (error) => {
        if (error) {
          customAlert(
            "error",
            "No se pudo cambiar el estado de la foto!",
            2000
          );
        } else {
          customAlert("success", "Acción fue exitosa!", 2000);
        }
      }
    );
    setSelectedPhoto(null); // Cierra el modal
  };

  return (
    <div>
      {pendingPhotos.map((photo) => (
        <div
          key={photo.speciesId + "-" + photo.index}
          className="mb-4 flex justify-between items-center"
        >
          <Button
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            onClick={() => handleViewPhoto(photo)}
          >
            ({photo.scientificName}) - Subida por: (
            {photo.createdby?.name || "Desconocido"}) Ver Imagen
          </Button>
        </div>
      ))}

      {selectedPhoto && (
        <Modal show={!!selectedPhoto} onClose={() => setSelectedPhoto(null)}>
          <Modal.Header>Detalles de la Imagen</Modal.Header>
          <Modal.Body>
            <img
              src={selectedPhoto.image}
              alt="Imagen de la Especie"
              className="w-full h-48 object-cover mt-4"
            />
            <p>
              <strong>Nombre Científico:</strong> {selectedPhoto.scientificName}
            </p>
            <p>
              <strong>Subido por:</strong>{" "}
              {selectedPhoto.createdby?.name || "Desconocido"}
            </p>

            <div className="flex justify-between mt-4">
              <Button
                color="success"
                onClick={() =>
                  handleDecision(
                    selectedPhoto.speciesId,
                    selectedPhoto.index,
                    "accepted"
                  )
                }
              >
                Aceptar
              </Button>
              <Button
                color="failure"
                onClick={() =>
                  handleDecision(
                    selectedPhoto.speciesId,
                    selectedPhoto.index,
                    "rejected"
                  )
                }
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

export default PhotoRequestsSection;
