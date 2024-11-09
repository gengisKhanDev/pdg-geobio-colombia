import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Footer from "../components/Footer";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { FileInput, Label, Tooltip } from "flowbite-react";
import { customAlert } from "../../startup/client/custom-alert.js";

export function Publicar() {
  const [image, setImage] = useState(null);
  const [iucnRedListCategory, setIucnRedListCategory] = useState("");
  const [departamentos, setDepartamentos] = useState("");
  const user = useTracker(() => Meteor.user());

  if (!user) {
    return (
      <div>
        Por favor, inicia sesión para ver tu cuenta.
        <a
          href="/login"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Ir al Login
        </a>
      </div>
    );
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

    const coordinatesPattern = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;

    if (!coordinatesPattern.test(lnlg)) {
      customAlert(
        "error",
        "Las coordenadas deben ser números separados por una coma, sin caracteres alfabéticos o especiales.",
        3000
      );
      return;
    }
    if (smallFileUpload === null) {
      return customAlert("error", "Agrega una imágen por favor!", 3000);
    }
    if (verbatimLocality === "") {
      verbatimLocality = "N/A";
    }
    if (family === "") {
      family = "N/A";
    }
    const [latitudeStr, longitudeStr] = lnlg.split(",");
    const latitude = parseFloat(latitudeStr.trim());
    const longitude = parseFloat(longitudeStr.trim());

    Meteor.call(
      "species.publicar",
      scientificName,
      classForm,
      latitude,
      longitude,
      genericName,
      stateProvince,
      iucnRedListCategory,
      verbatimLocality,
      family,
      smallFileUpload,
      (error, result) => {
        if (error) {
          console.error("Error fetching species:", error);
        } else {
          customAlert(
            "success",
            "Solicitud para agregar especie enviada, espere la aprobación",
            3000
          );
          setImage(null);
          e.target.reset();
          setIucnRedListCategory("");
          setDepartamentos("");
        }
      }
    );
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
                className="flex items-center mb-2 text-sm font-medium"
              >
                Nombre científico
                <Tooltip content="Introduce el nombre científico de la especie, ejm: Icterus chrysater (Lesson, 1844)">
                  <HiQuestionMarkCircle className="ml-1 text-gray-500 cursor-pointer" />
                </Tooltip>
              </label>
              <input
                id="scientificName"
                type="text"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="classForm"
                className="flex items-center mb-2 text-sm font-medium"
              >
                Clase
                <Tooltip content="Introduce la clase taxonómica de la especie, ejm: Aves">
                  <HiQuestionMarkCircle className="ml-1 text-gray-500 cursor-pointer" />
                </Tooltip>
              </label>
              <input
                id="classForm"
                type="text"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lnlg"
                className="flex items-center mb-2 text-sm font-medium"
              >
                Longitud & Latitud (pegar coordenadas)
                <Tooltip content="Introduce las coordenadas en formato latitud, longitud, ejm: 2.993965, -76.784989">
                  <HiQuestionMarkCircle className="ml-1 text-gray-500 cursor-pointer" />
                </Tooltip>
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
                className="flex items-center mb-2 text-sm font-medium"
              >
                Nombre genérico
                <Tooltip content="Introduce el nombre común de la especie, ejm: Icterus">
                  <HiQuestionMarkCircle className="ml-1 text-gray-500 cursor-pointer" />
                </Tooltip>
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
                className="flex items-center mb-2 text-sm font-medium"
              >
                Departamento
                <Tooltip content="Selecciona el departamento donde se encontró la especie">
                  <HiQuestionMarkCircle className="ml-1 text-gray-500 cursor-pointer" />
                </Tooltip>
              </label>
              <select
                id="stateProvince"
                value={departamentos}
                onChange={(e) => setDepartamentos(e.target.value)}
                className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="Chocó">Chocó</option>
                <option value="Valle del Cauca">Valle del Cauca</option>
                <option value="Cauca">Cauca</option>
                <option value="Nariño">Nariño</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="iucnCategory"
                className="flex items-center mb-2 text-sm font-medium"
              >
                Categorías de la Lista Roja (opcional)
                <Tooltip content="Selecciona el estado de conservación según la Lista Roja de la UICN">
                  <HiQuestionMarkCircle className="ml-1 text-gray-500 cursor-pointer" />
                </Tooltip>
              </label>
              <select
                id="iucnCategory"
                value={iucnRedListCategory}
                onChange={(e) => setIucnRedListCategory(e.target.value)}
                className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="n/a">Seleccionar opción</option>
                <option value="CR">En Peligro Crítico (CR)</option>
                <option value="EN">En Peligro (EN)</option>
                <option value="VU">Vulnerable (VU)</option>
                <option value="NT">Casi Amenazada (NT)</option>
                <option value="LC">Preocupación Menor (LC)</option>
                <option value="DD">Datos Insuficientes (DD)</option>
                <option value="NE">No Evaluada (NE)</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="verbatimLocality"
                className="flex items-center mb-2 text-sm font-medium"
              >
                Ubicación exacta en texto
                <Tooltip content="Proporciona una descripción textual de la ubicación, como nombre de ciudad o sitio específico, ejm: Puelenje, Popayán, Cauca, CO">
                  <HiQuestionMarkCircle className="ml-1 text-gray-500 cursor-pointer" />
                </Tooltip>
              </label>
              <input
                id="verbatimLocality"
                type="text"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="family"
                className="flex items-center mb-2 text-sm font-medium"
              >
                Familia
                <Tooltip content="Especifica la familia taxonómica de la especie ejm: Icteridae.">
                  <HiQuestionMarkCircle className="ml-1 text-gray-500 cursor-pointer" />
                </Tooltip>
              </label>
              <input
                id="family"
                type="text"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <div>
                <Label
                  htmlFor="smallFileUpload"
                  value="Agregar imagen de la especie:"
                />
              </div>
              <FileInput
                id="smallFileUpload"
                onChange={handleImageChange}
                sizing="sm"
                accept="image/*" // Acepta solo archivos de imagen
              />
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
      <Footer userRole={user.profile.firstName} />
    </>
  );
}
