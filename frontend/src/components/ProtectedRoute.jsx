import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      navigate("/"); // Redirect to home if not authorized
    }
  }, [user, navigate, allowedRoles]);

  return user && allowedRoles.includes(user.role) ? children : null;
};

export default ProtectedRoute;
