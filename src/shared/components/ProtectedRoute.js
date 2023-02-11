import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { children } = props;

  const auth = useSelector((state) => state.auth);

  const isLoggedOut = !auth.userId && auth.isInitialized;

  if (isLoggedOut) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;