import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="text-center text-lg font-semibold">Loading...</div>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/signIn" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;
