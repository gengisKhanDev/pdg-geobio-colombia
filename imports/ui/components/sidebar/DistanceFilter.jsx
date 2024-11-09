import React from 'react';
import { customAlert } from "../../../startup/client/custom-alert.js";

const DistanceFilter = ({ value, onChange }) => {
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (newValue > 100) {
      customAlert("error",'Máximo de distancia son 100km:', 3000);
      e.target.value = 100;
      onChange(100);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="">
      <label className="block text-black mb-2" htmlFor="distance">
        Distancia (km):
      </label>
      <input
        id="distance"
        type="number"
        min="1"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default DistanceFilter;
