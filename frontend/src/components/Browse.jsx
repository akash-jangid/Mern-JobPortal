import React, { useEffect } from "react";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const distpatch = useDispatch();
  useEffect(() => {
    return () => {
      distpatch(setSearchedQuery(""));
    };
  });
  return (
    <div>
      <Navbar />
      <div className="mx-20 px-6 md:px-12  mt-10 space-y-10">
        <h1>Search Results ({allJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
