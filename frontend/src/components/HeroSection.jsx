import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import bulb from "../assets/Group (1).svg";
import plane from "../assets/Group.svg";
import group from "../assets/19184614_6101000 1.svg";
import plant from "../assets/Group (2).svg";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center py-10 ">
      <div className=" mx-auto px-6 md:px-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          <div className="flex justify-center">
            <img
              src={bulb}
              alt="A bulb icon representing job opportunities"
              className="w-24 h-24 md:w-48 md:h-48 md:mt-20 md:ml-[350px]"
            />
          </div>

          <div className="space-y-6 md:col-span-5 text-center">
            <span className="mx-auto px-6 py-2 rounded-full bg-gradient-to-r from-[#8d60e8] to-[#7943d7] text-white font-medium text-2xl">
              No. 1 Job Hunt Website
            </span>
            <h1 className="text-3xl md:text-6xl">
              Search, Apply & <br />
              Get Your
              <br />
              <span className="text-3xl md:text-6xl font-semibold leading-tight mb-6 text-[#6fbd89] py-2">
                Dream Jobs
              </span>
            </h1>
            <p className="text-lg text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              aspernatur temporibus nihil tempora dolor!
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={plane}
              alt="A plane icon representing journey or travel"
              className="w-24 h-24 md:w-48 md:h-48 md:mt-20 md:mr-[350px]"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex w-full max-w-lg shadow-lg border border-gray-200 rounded-full items-center justify-between bg-white">
            <div className=" px-4  ">
              <input
                type="text"
                placeholder="Find your dream jobs"
                onChange={(e) => setQuery(e.target.value)}
                className="outline-none border-none w-full  text-lg text-gray-700"
              />
            </div>

            <Button
              onClick={searchJobHandler}
              className="rounded-full w-24 px-4 py-2 bg-[#6A38C2] text-white hover:bg-[#5a2f99]  transition duration-300"
            >
              <Search className="h-5 w-5 " />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex justify-center">
            <img
              src={plant}
              alt="A plane icon representing journey or travel"
              className="w-14 h-14 md:w-48 md:h-48 md:ml-[150px]"
            />
          </div>
          <div className="flex justify-center items-center gap-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F83002] via-[#F83002] to-[#F83002] grid-pattern"></div>

            <img
              src={group}
              alt="A plane icon representing journey or travel"
              className="w-48 h-48 md:w-[1000px] md:h-[500px] relative z-10"
            />
          </div>

          <div className="flex justify-center">
            <img
              src={plant}
              alt="A plane icon representing journey or travel"
              className="w-14 h-14 md:w-48 md:h-48 md:mr-[150px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
