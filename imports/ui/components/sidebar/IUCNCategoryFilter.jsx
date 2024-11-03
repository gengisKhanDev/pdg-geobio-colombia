import React from "react";

const IUCNCategoryFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="iucnCategory">Categorías de la Lista Roja: </label>
      <select
        id="iucnCategory"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Todos</option>
        <option value="CR">En Peligro Crítico (CR)</option>
        <option value="EN">En Peligro (EN)</option>
        <option value="VU">Vulnerable (VU)</option>
        <option value="NT">Casi Amenazada (NT)</option>
        <option value="LC">Preocupación Menor (LC)</option>
        <option value="DD">Datos Insuficientes (DD)</option>
        <option value="NE">No Evaluada (NE)</option>
      </select>
    </div>
  );
};

export default IUCNCategoryFilter;
