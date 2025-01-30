import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

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
  return (
    <div className='w-full bg-[#04A1DB] text-[#4e4242] p-3 rounded-md shadow-2xl'>
        <h1 className='font-bold text-lg text-[#4d377f]'>Filter Games</h1>
        <hr className='mt-3'/>
        <RadioGroup >
            {
                filterData.map((data,index)=>(
                    <div>
                        <h1 className='font-bold text-lg text-[#1c114a]'>{data.filterType}</h1>
                        {
                            data.array.map((item,idx)=>{
                                return(
                                    <div className='flex items-center space-x-2 m-2'>
                                        <RadioGroupItem value={item}/>
                                        <Label>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterGameCard;
