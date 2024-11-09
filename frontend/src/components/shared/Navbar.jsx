import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../../utils/constant";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Logout failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

  return (
    <div className="shadow-md pt-2">
      <div className="flex items-center justify-between w-full h-26 md:px-12 px-4">
        <div className="flex items-center gap-2">
          <h1>
            Job<span className="text-[#6fbd89]">Portal</span>
          </h1>
        </div>

        <div className="hidden md:flex">
          <ul className="flex items-center gap-10 text-gray-900">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-[#6A38C2]">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-[#6A38C2]">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/admin/applicants" className="hover:text-[#6A38C2]">
                    Applicants
                  </Link>
                </li>
              </>
            ) : user && user.role === "applicant" ? (
              <>
                <li>
                  <Link to="/" className="hover:text-[#6A38C2]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#6A38C2]">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-[#6A38C2]">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to="/applied-jobs" className="hover:text-[#6A38C2]">
                    Applied Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#6A38C2]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#6A38C2]">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-[#6A38C2]">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <button
          className="md:hidden  text-gray-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {isMenuOpen && (
          <div className="md:hidden  flex flex-col items-center bg-white absolute top-16 left-0 right-0 shadow-md z-10 p-4 space-y-4">
            <ul className="flex flex-col items-center gap-6 text-gray-900">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/jobs"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/applicants"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Applicants
                    </Link>
                  </li>
                </>
              ) : user && user.role === "applicant" ? (
                <>
                  <li>
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Browse
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/applied-jobs"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Applied Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[#6A38C2]"
                    >
                      Browse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-[#6A38C2] border-[#6A38C2] hover:bg-[#F4F3F8]"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User Avatar"
                    />
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white shadow-lg rounded-lg p-4">
                <div className="flex gap-4 items-center">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User Avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-lg">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-4 text-gray-600">
                  {user && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 className="text-gray-600" />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="text-gray-600" />
                    <Button variant="link" onClick={logoutHandler}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
