import { Badge } from "./ui/badge";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="card latest-job-card flex flex-col justify-between p-6 m-2 rounded-lg shadow-lg bg-white border border-gray-100 cursor-auto min-h-[250px]">
      <div className="flex items-center gap-2 mb-4">
        <Badge className="text-[#6fbd89] font-bold py-1" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold py-1" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold py-1" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <Avatar>
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <h2 className="font-semibold text-lg">{job?.company?.name}</h2>
      </div>

      <p className="text-gray-500 text-sm mb-2">{job?.location}</p>

      <div className="space-y-2 mb-3">
        <h3 className="font-bold text-lg ">{job?.title}</h3>
        <p className="font-light text-sm leading-4 text-justify">
          {job?.description}
        </p>
      </div>

      <Button
        className="mt-auto w-full bg-black text-white hover:bg-[#66298f] hover:text-grey-500"
        onClick={() => navigate(`/description/${job._id}`)}
      >
        Detail
      </Button>
    </div>
  );
};

export default LatestJobCards;
