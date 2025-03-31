import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    array: [
      "Charusat Main Ground",
      "Central Loan",
      "ARIP Ground",
      "Sport Complex",
    ],
  },
  {
    filterType: "Game Category",
    key: "category",
    array: ["Outdoor Sports", "Indoor Games", "E-Sports", "Fun & Casual Games"],
  },
  {
    filterType: "Skills",
    key: "skills",
    array: ["Speed", "Strength", "Flexibility"],
  },
];

function FilterGameCard() {
  const { allGames } = useSelector((state) => state.game);

  // console.log(allGames);

  const [expandedSections, setExpandedSections] = useState(
    filterData.reduce(
      (acc, filter) => ({ ...acc, [filter.filterType]: true }),
      {}
    )
  );

  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    category: [],
    skills: [],
  });

  // Toggle filter section visibility
  const toggleSection = (filterType) => {
    setExpandedSections((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  // Handle filter selection
  const handleCheckboxChange = (filterKey, value) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[filterKey].includes(value);
      return {
        ...prev,
        [filterKey]: isSelected
          ? prev[filterKey].filter((item) => item !== value) // Remove if already selected
          : [...prev[filterKey], value], // Add if not selected
      };
    });
  };

  // Apply filters to allGames
  const filteredGames = allGames.filter((game) => {
    return (
      (selectedFilters.location.length === 0 ||
        selectedFilters.location.includes(game.location)) &&
      (selectedFilters.category.length === 0 ||
        selectedFilters.category.some(
          (cat) =>
            game.gameCatagory?.toLowerCase().trim() === cat.toLowerCase().trim() // Add optional chaining `?.`
        )) &&
      (selectedFilters.skills.length === 0 ||
        selectedFilters.skills.some(
          (skill) =>
            game.skills
              ?.map((s) => s.toLowerCase().trim())
              .includes(skill.toLowerCase().trim()) // Add `?.` to prevent errors
        ))
    );
  });

  // console.log("All Games:", allGames);
  console.log("Selected Filters:", selectedFilters);
  // console.log("Filtered Games:", filteredGames);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 flex items-center gap-3">
        <SlidersHorizontal className="w-5 h-5" />
        <h1 className="font-bold text-xl">Filter Games</h1>
      </div>

      {/* Filter Sections */}
      <div className="p-6 space-y-6">
        {filterData.map((data, index) => (
          <div
            key={index}
            className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
          >
            <button
              onClick={() => toggleSection(data.filterType)}
              className="flex justify-between items-center w-full text-left group"
            >
              <span className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                {data.filterType}
              </span>
              <div className="p-1 rounded-full bg-gray-100 group-hover:bg-blue-50 transition-colors duration-200">
                {expandedSections[data.filterType] ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                )}
              </div>
            </button>

            {/* Filter Options */}
            <div
              className={`mt-4 space-y-3 overflow-hidden transition-all duration-300 ${
                expandedSections[data.filterType]
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {data.array.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 group/item hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                >
                  <Checkbox
                    id={`${data.key}-${idx}`}
                    checked={selectedFilters[data.key].includes(item)}
                    onCheckedChange={() => handleCheckboxChange(data.key, item)}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label
                    htmlFor={`${data.key}-${idx}`}
                    className="text-gray-700 cursor-pointer group-hover/item:text-blue-600 transition-colors duration-200"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Apply Filters Button */}
      <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-100">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          onClick={() => console.log("Filtered Games:", filteredGames)}
        >
          Apply Filters
        </Button>
      </div>

      {/* Display Filtered Games */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Filtered Games</h2>
        {filteredGames.length > 0 ? (
          <ul className="space-y-2">
            {filteredGames.map((game, index) => (
              <li
                key={index}
                className="p-3 border border-gray-200 rounded-lg shadow-sm"
              >
                <p>
                  <strong>Name:</strong> {game.name}
                </p>
                <p>
                  <strong>Location:</strong> {game.location}
                </p>
                <p>
                  <strong>Category:</strong> {game.category}
                </p>
                <p>
                  <strong>Skills:</strong> {game.skills.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No games match the selected filters.</p>
        )}
      </div>
    </div>
  );
}

export default FilterGameCard;
