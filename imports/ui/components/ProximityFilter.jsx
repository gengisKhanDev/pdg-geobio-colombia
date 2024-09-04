import React from 'react';

const ProximityFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="proximityFilter">Mostrar animales cercanos?: </label>
      <select id="proximityFilter" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="yes">Sí</option>
        <option value="no">No</option>
      </select>
    </div>
  );
};

export default ProximityFilter;
