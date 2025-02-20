import { setAllAppliedJobs } from "../redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log("appliedJobsbyAkash", res.data);

        if (res.data.success && res.data.jobs) {
          dispatch(setAllAppliedJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};
export default useGetAppliedJobs;
