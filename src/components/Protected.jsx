import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../global/userContext";
import { ROUTES } from "../constants";
function Protected({ children }) {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={ROUTES.HOME.path} replace/>;
  }
  return children;
}
export default Protected;
