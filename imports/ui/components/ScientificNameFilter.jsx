import React from "react";

const ScientificNameFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="scientificName">Scientific Name: </label>
      <input 
        id="scientificName"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter scientific name"
      />
    </div>
  );
};

export default ScientificNameFilter;
