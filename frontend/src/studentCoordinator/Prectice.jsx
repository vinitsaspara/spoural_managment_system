import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "@/components/shared/Navbar";
import getAllGames from "@/hooks/useGetAllGame"; 
import SCPrecticeCard from "./SCPrecticeCard";

function Prectice() {

    getAllGames(); 
  

  const { allGames } = useSelector((store) => store.game);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-20">
        <div className="flex gap-5">
          {allGames?.length > 0 ? (
            <div className="flex-1 h-[88vh]">
              <div className="grid grid-cols-3 gap-4">
                {allGames.map((game) => (
                  <SCPrecticeCard key={game?._id} game={game} />
                ))}
              </div>
            </div>
          ) : (
            <span>Game not found</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prectice;
