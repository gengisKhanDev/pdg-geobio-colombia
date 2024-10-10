import React from "react";

const ProximityFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="proximityFilter">Mostrar animales cercanos?: </label>
      <select
        id="proximityFilter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="yes">Sí</option>
        <option value="no">No</option>
      </select>
    </div>
  );
};

export default ProximityFilter;
