import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading/Loading";

const PrivateRoute = ({ children }) => {
	const location = useLocation();
	const { user, loading } = use(AuthContext);

	if (loading) {
		return <Loading />;
	}

	if (!user) {
		return <Navigate to="/login" state={location.pathname} />;
	}
	return children;
};

export default PrivateRoute;
