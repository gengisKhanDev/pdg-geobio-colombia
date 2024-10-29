import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Footer from "../components/Footer";
import { FileInput, Label } from "flowbite-react";

export function Publicar() {
  const [image, setImage] = useState(null);
  const user = useTracker(() => Meteor.user());

  if (!user) {
    return <div>Por favor, inicia sesión para ver tu cuenta.</div>;
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const scientificName = e.target.scientificName.value;
    const classForm = e.target.classForm.value;
    const lnlg = e.target.lnlg.value;
    const genericName = e.target.genericName.value;
    const stateProvince = e.target.stateProvince.value;
    let verbatimLocality = e.target.verbatimLocality.value;
    let family = e.target.family.value;
    const smallFileUpload = image;
    if(smallFileUpload === null){
      return alert("por favor añadir una imagen");
    }
    if(verbatimLocality === ""){
      verbatimLocality = "N/A"
    }
    if(family === ""){
      family = "N/A"
    }
    Meteor.call("species.publicar", scientificName, classForm, lnlg, genericName, stateProvince, verbatimLocality,
      family, smallFileUpload, (error, result) => {
      if(error){
        console.error("Error fetching species:", error);
      }
      else {
        console.log("Fetched species:", result);
      }
    });
  };
  return (
    <>
      <div className="flex justify-center items-center pb-20 pt-5 bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6">Agregar especie</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="scientificName"
                className="block mb-2 text-sm font-medium"
              >
                Nombre cientifico:
              </label>
              <input
                id="scientificName"
                type="text"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="classForm" className="block mb-2 text-sm font-medium">
                Clase:
              </label>
              <input
                id="classForm"
                type="text"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lnlg" className="block mb-2 text-sm font-medium">
                Longitud & latitud:
              </label>
              <input
                id="lnlg"
                type="text"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="genericName"
                className="block mb-2 text-sm font-medium"
              >
                Nombre generico:
              </label>
              <input
                id="genericName"
                type="text"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="stateProvince"
                className="block mb-2 text-sm font-medium"
              >
                Departamento:
              </label>
              <input
                id="stateProvince"
                type="text"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="verbatimLocality"
                className="block mb-2 text-sm font-medium"
              >
                VerbatimLocality (opcional):
              </label>
              <input
                id="verbatimLocality"
                type="text"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="family"
                className="block mb-2 text-sm font-medium"
              >
                Familia (opcional):
              </label>
              <input
                id="family"
                type="text"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <div>
                <Label htmlFor="smallFileUpload" value="Small file input" />
              </div>
              <FileInput id="smallFileUpload" onChange={handleImageChange} sizing="sm" />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
              Añadir
            </button>
          </form>
        </div>
      </div>
      <Footer userRole={user.profile.role.name} />
    </>
  );
}
