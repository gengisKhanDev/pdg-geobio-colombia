import React from "react";

const ScientificNameFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="scientificName">Nombre Científico: </label>
      <input
        className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="scientificName"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ingresa Nombre Científico"
      />
    </div>
  );
};

export default ScientificNameFilter;