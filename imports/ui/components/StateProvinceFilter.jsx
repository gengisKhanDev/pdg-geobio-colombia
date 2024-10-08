import React from "react";

const StateProvinceFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="stateProvince">State/Province: </label>
      <select
        id="stateProvince"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
