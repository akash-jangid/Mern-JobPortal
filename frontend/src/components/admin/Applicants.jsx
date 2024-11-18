import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "../../redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "../../../utils/constant";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    let isMounted = true;

    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        if (isMounted) {
          dispatch(setApplicants(res.data?.job?.applications || []));
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching applicants:", error);
        }
      }
    };

    fetchAllApplicants();

    return () => {
      isMounted = false;
    };
  }, [dispatch, params.id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants ? applicants.length : 0}
        </h1>
        <ApplicantsTable applicants={applicants} />
      </div>
    </div>
  );
};

export default Applicants;
