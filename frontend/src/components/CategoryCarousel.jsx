import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Carousel className="w-full max-w-4xl mx-auto mt-4 mb-6">
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex-none m-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2  "
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="w-full rounded-full text-sm  bg-[#6A38C2] text-white hover:text-white hover:bg-[#5a2f99]  transition duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
