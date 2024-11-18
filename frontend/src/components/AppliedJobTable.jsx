import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";
import { Badge } from "./ui/badge";
import Navbar from "./shared/Navbar";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log(allAppliedJobs); // Add this before returning JSX

  // Check if there are no applied jobs
  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return <span>You did not apply for any job yet.</span>;
  }

  return (
    <div>
      <Navbar />
      <div className="md:mx-40 md:my-10">
        <Table>
          <TableCaption>A list of applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
