import React from "react";

const ScientificNameFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="scientificName">Scientific Name: </label>
      <input
        className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

// import React from "react";
// import { Card, Button, Label } from "flowbite-react";

// const ScientificNameFilter = ({ value, onChange }) => {
//   return (
//     <div>
//       <label
//         for="scientificName"
//         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//       >
//         First name
//       </label>
//       <input
//         className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         id="scientificName"
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder="Enter scientific name"
//       />
//     </div>
//   );
// };

// export default ScientificNameFilter;
