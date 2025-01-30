import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const allSkill = ["Speed", "Strength", "Flexibility"];
const isApplied = false;

function GameDetails() {
  return (
    <div className="max-w-5xl mx-auto my-10 shadow-lg p-5 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">Cricket</h1>
        </div>

        <Button
          className={`rounded-md ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#903b3b] hover:bg-[#d98825]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Game Details
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1 flex items-center gap-2">
            Name:
            <div>
              <span className="p-4 font-normal text-gray-800">Cricket</span>
            </div>
          </h1>
          <h1 className="font-bold my-1">
            Category:
            <span className="p-4 font-normal text-gray-800">Game Category</span>
          </h1>
          <h1 className="font-bold my-1 flex items-center gap-2 ">
            Required Skill:
            <div className="flex items-center gap-2">
              {allSkill.map((skill, index) => (
                <Badge className="text-blue-800 font-bold" variant="ghost">
                  {skill}
                </Badge>
              ))}
            </div>
          </h1>
          <h1 className="font-bold my-1">
            Description:
            <span className="p-4 font-normal text-gray-800">
              Lorem ipsum dolor sit amet.
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:
            <span className="p-4 font-normal text-gray-800">
              Charusat Main Ground
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Players:
            <span className="p-4 font-normal text-gray-800">3</span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:
            <span className="p-4 font-normal text-gray-800">12-04-25</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
