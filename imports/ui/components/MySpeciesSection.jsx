import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

const MySpeciesSection = ({ mySpecies }) => {
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const handleViewMore = (species) => {
    setSelectedSpecies(species);
  };

  return (
    <div>
      {mySpecies.map((species) => (
        <div key={species._id} className="mb-4">
          <div className="flex justify-between items-center">
            <Button
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              onClick={() => handleViewMore(species)}
            >
              ({species.scientificName}) - ({species.createdBy.name}) Ver
              Detalles
            </Button>
          </div>
          <p className="text-sm text-gray-600">Estado: {species.status}</p>
          {species.note && (
            <p className="text-sm text-gray-600">
              Nota del revisor: {species.note}
            </p>
          )}
        </div>
      ))}

      {selectedSpecies && (
        <Modal show={selectedSpecies} onClose={() => setSelectedSpecies(null)}>
          <Modal.Header>Detalles de la Especie</Modal.Header>
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
              <strong>Estado:</strong> {selectedSpecies.status}
            </p>
            {selectedSpecies.note && (
              <p>
                <strong>Nota del Revisor:</strong> {selectedSpecies.note}
              </p>
            )}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default MySpeciesSection;
