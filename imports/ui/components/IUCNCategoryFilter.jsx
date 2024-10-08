import React from "react";

const IUCNCategoryFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="iucnCategory">Red List Category: </label>
      <select id="iucnCategory" value={value} onChange={(e) => onChange(e.target.value)}>
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
