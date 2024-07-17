import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  return !isAuthenticated && !loading ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
