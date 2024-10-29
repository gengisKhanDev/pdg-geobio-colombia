import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Species } from "/imports/api/species/species"; // Asegúrate de que está bien importado

const UploadPhoto = ({ speciesId }) => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!image) {
      setUploadStatus("Por favor selecciona una imagen.");
      return;
    }

    Meteor.call("species.addPhoto", speciesId, {
      image,
      uploadedBy: Meteor.user()._id,
      status: "pending",
    }, (error) => {
      if (error) {
        setUploadStatus("Error al subir la foto. Intenta de nuevo.");
      } else {
        setUploadStatus("Foto subida exitosamente. Espera aprobación.");
      }
    });
  };

  return (
    <div className="upload-photo-container">
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Preview" className="mt-2 max-w-xs" />}
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded mt-2">
        Subir Foto
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UploadPhoto;
