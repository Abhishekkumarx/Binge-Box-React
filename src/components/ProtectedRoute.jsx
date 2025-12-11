import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const hasPaid = localStorage.getItem("paid");

  if (!hasPaid) {
    return <Navigate to="/pay" replace />;
  }

  return children;
};

export default ProtectedRoute;
