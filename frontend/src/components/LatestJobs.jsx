import React from "react";
import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="flex items-center justify-between ">
      <div className=" mx-4 md:mx-20 ">
        <h1>
          <span className="text-[2rem] md:text-3xl font-semibold leading-tight mb-6 text-[#6fbd89] py-2">
            Latest & Top{" "}
          </span>
          Job Openings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 ">
          {allJobs.length <= 0 ? (
            <span>No Jobs Available</span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <LatestJobCards key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
