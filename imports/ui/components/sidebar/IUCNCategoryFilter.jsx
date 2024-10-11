import React from "react";

const IUCNCategoryFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="iucnCategory">Red List Category: </label>
      <select
        id="iucnCategory"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">All</option>
        <option value="CR">Critically Endangered (CR)</option>
        <option value="EN">Endangered (EN)</option>
        <option value="VU">Vulnerable (VU)</option>
        <option value="NT">Near Threatened (NT)</option>
        <option value="LC">Least Concern (LC)</option>
        <option value="DD">Data Deficient (DD)</option>
        <option value="NE">Not Evaluated (NE)</option>
      </select>
    </div>
  );
};

export default IUCNCategoryFilter;
