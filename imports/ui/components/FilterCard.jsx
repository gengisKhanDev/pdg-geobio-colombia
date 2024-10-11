import React from "react";
import { Card } from "flowbite-react";
import ScientificNameFilter from "./sidebar/ScientificNameFilter";
import DistanceFilter from "./sidebar/DistanceFilter";
import { HiMenu, HiLocationMarker } from "react-icons/hi";

export function FilterCard({ onOpen, scientificName, setScientificName, setDistanceFilter, distanceFilter }) {
  return (
    <Card className="max-w-sm shadow-green-500/50 absolute top-4 left-4 p-2 bg-slate-100 text-black rounded-md shadow-lg button-top">
      <div className="flex items-center space-x-2">
        <HiMenu size={24} className="cursor-pointer mr-4" onClick={onOpen} />
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-black">
          Filter Options
        </h5>
      </div>
      <ScientificNameFilter
        value={scientificName}
        onChange={setScientificName}
      />
      <DistanceFilter value={distanceFilter} onChange={setDistanceFilter} />
      <div className="flex items-center space-x-2">
        <HiLocationMarker size={24} className="cursor-pointer mr-4" />
        {/* <HiMenu size={24} className="cursor-pointer mr-4"/> */}
      </div>
    </Card>
  );
}
