import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    let filteredJobs = allJobs;

    if (searchedQuery) {
      const query = searchedQuery.toString().toLowerCase();
      filteredJobs = filteredJobs.filter((job) => {
        const jobTitle = job.title.toLowerCase();
        const jobDescription = job.description.toLowerCase();
        const jobLocation = job.location.toLowerCase();
        const jobSalary = parseFloat(job.salary);

        let matchesTitle = jobTitle.includes(query);
        let matchesDescription = jobDescription.includes(query);
        let matchesLocation = jobLocation.includes(query);

        if (
          searchedQuery.minSalary !== undefined &&
          searchedQuery.maxSalary !== undefined
        ) {
          const { minSalary, maxSalary } = searchedQuery;
          const matchesSalary =
            jobSalary >= minSalary && jobSalary <= maxSalary;
          return (
            matchesTitle ||
            matchesDescription ||
            matchesLocation ||
            matchesSalary
          );
        }

        return matchesTitle || matchesDescription || matchesLocation;
      });
    }

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="mx-20 mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>
          <div className="flex-1 h-[88vh]  pb-5">
            {filterJobs.length === 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
