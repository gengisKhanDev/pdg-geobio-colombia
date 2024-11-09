import React, { forwardRef } from "react";
import ProximityFilter from "./sidebar/ProximityFilter";
import ScientificNameFilter from "./sidebar/ScientificNameFilter";
import StateProvinceFilter from "./sidebar/StateProvinceFilter";
import IUCNCategoryFilter from "./sidebar/IUCNCategoryFilter";
import { Sidebar } from "flowbite-react";
import { HiFilter, HiAdjustments, HiX } from "react-icons/hi";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import DistanceFilter from "./sidebar/DistanceFilter";

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
      distanceFilter,
      setDistanceFilter,
    },
    ref
  ) => {
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();
    const handleLoginClick = () => {
      if (user) {
        navigate("/myaccount");
      } else {
        navigate("/login");
      }
    };
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
                <h2 className="text-lg font-bold mb-4">Filtros</h2>
              </Sidebar.Item>

              <Sidebar.Item icon={HiFilter}>
                <ProximityFilter
                  value={proximityFilter}
                  onChange={setProximityFilter}
                />
              </Sidebar.Item>

              {proximityFilter === "yes" && (
                <Sidebar.Item icon={HiFilter} className="ml-8">
                  <DistanceFilter
                    value={distanceFilter}
                    onChange={setDistanceFilter}
                  />
                </Sidebar.Item>
              )}

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
              {/* Añadir el filtro de distancia */}

              <button
                className="p-2 bg-blue-600 text-white rounded mt-4"
                onClick={handleLoginClick}
              >
                {user ? "Mi Cuenta" : "Iniciar Sesión"}
              </button>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    );
  }
);
export default FilterSidebar;
