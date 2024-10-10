import React from "react";

const StateProvinceFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="stateProvince">State/Province: </label>
      <select
        id="stateProvince"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="All">All</option>
        <option value="Chocó">Chocó</option>
        <option value="Valle del Cauca">Valle del Cauca</option>
        <option value="Cauca">Cauca</option>
        <option value="Nariño">Nariño</option>
      </select>
    </div>
  );
};

export default StateProvinceFilter;
