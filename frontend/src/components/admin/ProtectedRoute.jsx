import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  requiredRole,
  requireAppliedJobs = false,
}) => {
  const { user } = useSelector((store) => store.auth);
  const { allAppliedJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !user ||
      user.role !== requiredRole ||
      (requireAppliedJobs && allAppliedJobs.length === 0)
    ) {
      navigate("/");
    }
  }, [user, requiredRole, requireAppliedJobs, allAppliedJobs, navigate]);

  return user &&
    user.role === requiredRole &&
    (!requireAppliedJobs || allAppliedJobs.length > 0) ? (
    <>{children}</>
  ) : null;
};

export default ProtectedRoute;
