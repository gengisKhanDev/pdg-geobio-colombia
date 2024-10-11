// En FilterSidebar.jsx
import React from 'react';

const DistanceFilter = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-black mb-2" htmlFor="distance">
        Distancia (km)
      </label>
      <input
        id="distance"
        type="number"
        min="1"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default DistanceFilter;
