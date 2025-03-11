import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Charusat Main Ground",
      "Central Loan",
      "ARIP Ground",
      "Sport Complex",
    ],
  },
  {
    filterType: "Game Category",
    array: ["Outdoor Sports", "Indoor Games", "E-Sports", "Fun & Casual Games"],
  },
  {
    filterType: "Skills",
    array: ["Speed", "Strength", "Flexibility"],
  }
];

function FilterGameCard() {
  const [expandedSections, setExpandedSections] = useState(
    filterData.reduce((acc, filter) => ({ ...acc, [filter.filterType]: true }), {})
  );

  const toggleSection = (filterType) => {
    setExpandedSections(prev => ({ ...prev, [filterType]: !prev[filterType] }));
  };

  return (
    <div className='w-full bg-white rounded-lg shadow-lg overflow-hidden'>
      <div className='bg-blue-600 text-white py-4 px-6'>
        <h1 className='font-bold text-xl'>Filter Games</h1>
      </div>
      <div className='p-6'>
        {filterData.map((data, index) => (
          <div key={index} className='mb-6 last:mb-0'>
            <button
              onClick={() => toggleSection(data.filterType)}
              className='flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors duration-200'
            >
              {data.filterType}
              {expandedSections[data.filterType] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections[data.filterType] && (
              <div className='mt-3 space-y-2'>
                {data.array.map((item, idx) => (
                  <div key={idx} className='flex items-center space-x-3'>
                    <Checkbox id={`${data.filterType}-${idx}`} />
                    <Label htmlFor={`${data.filterType}-${idx}`} className='text-gray-700 cursor-pointer'>
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='bg-gray-100 px-6 py-4 flex justify-end'>
        <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterGameCard;
