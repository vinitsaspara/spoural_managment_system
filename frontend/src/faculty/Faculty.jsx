import React from "react";
import { useSelector } from "react-redux";
import Navbar from "@/components/shared/Navbar";

import FGameCard from './FGameCard'
import useGetAllGame from "@/hooks/useGetAllGame";

function StudentCoordinator() {

  useGetAllGame()


  const {allGames} = useSelector(store=>store.game);

  return (
    <div>
      <Navbar/>
      <div className="max-w-6xl mx-auto mt-5">
        <div className="flex gap-5">
          
          {allGames.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] ">
              <div className="grid grid-cols-3 gap-4 ">
                {allGames.map((game) => (
                  <FGameCard key={game?._id} game={game} />
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