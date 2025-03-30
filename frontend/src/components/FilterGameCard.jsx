import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

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
    <div className='w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
      {/* Header with gradient background */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 flex items-center gap-3'>
        <SlidersHorizontal className="w-5 h-5" />
        <h1 className='font-bold text-xl'>Filter Games</h1>
      </div>

      {/* Filter sections */}
      <div className='p-6 space-y-6'>
        {filterData.map((data, index) => (
          <div 
            key={index} 
            className='border-b border-gray-100 last:border-0 pb-6 last:pb-0'
          >
            <button
              onClick={() => toggleSection(data.filterType)}
              className='flex justify-between items-center w-full text-left group'
            >
              <span className='font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200'>
                {data.filterType}
              </span>
              <div className='p-1 rounded-full bg-gray-100 group-hover:bg-blue-50 transition-colors duration-200'>
                {expandedSections[data.filterType] ? 
                  <ChevronUp className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" /> : 
                  <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                }
              </div>
            </button>

            {/* Checkbox section with animation */}
            <div 
              className={`mt-4 space-y-3 overflow-hidden transition-all duration-300 ${
                expandedSections[data.filterType] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {data.array.map((item, idx) => (
                <div 
                  key={idx} 
                  className='flex items-center space-x-3 group/item hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200'
                >
                  <Checkbox 
                    id={`${data.filterType}-${idx}`} 
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label 
                    htmlFor={`${data.filterType}-${idx}`} 
                    className='text-gray-700 cursor-pointer group-hover/item:text-blue-600 transition-colors duration-200'
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer with button */}
      <div className='bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-100'>
        <Button 
          className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20'
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterGameCard;
