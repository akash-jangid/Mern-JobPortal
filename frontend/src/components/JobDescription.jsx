import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constant";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch job details"
        );
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
          <div className="flex-1">
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-800">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge className="text-[#6fbd89] font-bold" variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg text-white ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad] transition duration-300 ease-in-out"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold text-lg text-gray-800">Job Details</h2>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
            <tbody>
              {[
                { label: "Role", value: singleJob?.title },
                { label: "Location", value: singleJob?.location },
                { label: "Description", value: singleJob?.description },
                { label: "Experience", value: `${singleJob?.experience} yrs` },
                { label: "Salary", value: `${singleJob?.salary} LPA` },
                {
                  label: "Total Applicants",
                  value: singleJob?.applications?.length,
                },
                {
                  label: "Posted Date",
                  value: singleJob?.createdAt?.split("T")[0],
                },
              ].map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} `}
                >
                  <td className="p-3 text-gray-800 font-medium border">
                    {item.label}
                  </td>
                  <td className="p-3 text-gray-600 border">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
