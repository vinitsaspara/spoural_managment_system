import React from "react";
import Navbar from "./shared/Navbar";
import FilterGameCard from "./FilterGameCard";
import GameCards from "./GameCards";

const GamesArray = [1, 2, 3, 4, 5, 6, 7, 8];

function Games() {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterGameCard />
          </div>
          {GamesArray.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] ">
              <div className="grid grid-cols-3 gap-4 ">
                {GamesArray.map((job) => (
                  <GameCards />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Games;
