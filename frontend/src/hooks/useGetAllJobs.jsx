// useGetAllJobs.jsx
import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../../utils/constant";
import { setAllJobs } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const url = `${JOB_API_END_POINT}/get`;
        const fullUrl = searchedQuery ? `${url}?keyword=${searchedQuery}` : url;

        console.log("Making API request to:", fullUrl);

        const res = await axios.get(fullUrl);
        console.log("Full response from API:", res);

        if (res.data && res.data.success) {
          console.log("Jobs fetched:", res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.error("Failed to fetch jobs:", res.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;
