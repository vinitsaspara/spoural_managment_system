import React from "react";
import { useSelector } from "react-redux";
import SCGameCards from "./SCGameCards";
import Navbar from "@/components/shared/Navbar";


function StudentCoordinator() {

  const {allGames} = useSelector(store=>store.game);

  return (
    <div>
      <Navbar/>
      <div className="max-w-6xl mx-auto mt-5">
        <div className="flex gap-5">
          
          {allGames.length <= 0 ? (
            <span>Game not found</span>
          ) : (
            <div className="flex-1 h-[88vh] ">
              <div className="grid grid-cols-3 gap-4 ">
                {allGames.map((game) => (
                  <SCGameCards key={game?._id} game={game} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentCoordinator;