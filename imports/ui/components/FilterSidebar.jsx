import React from 'react';
import ProximityFilter from './ProximityFilter';
import ScientificNameFilter from './ScientificNameFilter';
import StateProvinceFilter from './StateProvinceFilter';
import IUCNCategoryFilter from './IUCNCategoryFilter';
import { Sidebar } from 'flowbite-react';
import { HiFilter, HiAdjustments } from 'react-icons/hi';

const FilterSidebar = ({ sidebarOpen, proximityFilter, setProximityFilter, scientificNameFilter, setScientificNameFilter, stateProvinceFilter, setStateProvinceFilter, iucnCategoryFilter, setIUCNCategoryFilter }) => {
  return (
    <Sidebar aria-label="Filters Sidebar" className={`sidebar fixed top-0 left-0 h-full w-100 p-4 shadow-lg bg-white transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <h2 className="text-lg font-bold mb-4">GeoBio Colombia</h2>

      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiAdjustments}>
            <h2 className="text-lg font-bold mb-4">Filters</h2>
          </Sidebar.Item>

          <Sidebar.Item icon={HiFilter}>
            <ProximityFilter value={proximityFilter} onChange={setProximityFilter} />
          </Sidebar.Item>

          <Sidebar.Item icon={HiFilter}>
            <ScientificNameFilter value={scientificNameFilter} onChange={setScientificNameFilter} />
          </Sidebar.Item>

          <Sidebar.Item icon={HiFilter}>
            <StateProvinceFilter value={stateProvinceFilter} onChange={setStateProvinceFilter} />
          </Sidebar.Item>

          <Sidebar.Item icon={HiFilter}>
            <IUCNCategoryFilter value={iucnCategoryFilter} onChange={setIUCNCategoryFilter} />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default FilterSidebar;
