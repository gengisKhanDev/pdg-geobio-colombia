import React, { forwardRef } from "react";
import ProximityFilter from "./ProximityFilter";
import ScientificNameFilter from "./ScientificNameFilter";
import StateProvinceFilter from "./StateProvinceFilter";
import IUCNCategoryFilter from "./IUCNCategoryFilter";
import { Sidebar } from "flowbite-react";
import { HiFilter, HiAdjustments, HiX, HiLogin } from "react-icons/hi";
import { Link } from "react-router-dom";

const FilterSidebar = forwardRef(
  (
    {
      sidebarOpen,
      setSidebarOpen,
      proximityFilter,
      setProximityFilter,
      scientificNameFilter,
      setScientificNameFilter,
      stateProvinceFilter,
      setStateProvinceFilter,
      iucnCategoryFilter,
      setIUCNCategoryFilter,
    },
    ref
  ) => {
    return (
      <div ref={ref} className="sidebar fixed top-0 left-0 h-full">
        <Sidebar
          aria-label="Filters Sidebar"
          ref={ref} // Pass the ref here
          className={` fixed top-0 left-0 h-full w-90 p-4 shadow-lg bg-white transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">GeoBio Colombia</h2>
            {/* Close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <HiX size={24} />
            </button>
          </div>

          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiAdjustments}>
                <h2 className="text-lg font-bold mb-4">Filters</h2>
              </Sidebar.Item>

              <Sidebar.Item icon={HiFilter}>
                <ProximityFilter
                  value={proximityFilter}
                  onChange={setProximityFilter}
                />
              </Sidebar.Item>

              <Sidebar.Item icon={HiFilter}>
                <ScientificNameFilter
                  value={scientificNameFilter}
                  onChange={setScientificNameFilter}
                />
              </Sidebar.Item>

              <Sidebar.Item icon={HiFilter}>
                <StateProvinceFilter
                  value={stateProvinceFilter}
                  onChange={setStateProvinceFilter}
                />
              </Sidebar.Item>

              <Sidebar.Item icon={HiFilter}>
                <IUCNCategoryFilter
                  value={iucnCategoryFilter}
                  onChange={setIUCNCategoryFilter}
                />
              </Sidebar.Item>
              {/* Login Button */}
              <Sidebar.Item icon={HiLogin}>
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    );
  }
);
export default FilterSidebar;
