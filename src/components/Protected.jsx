import React, { useContext,useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../global/userContext";
import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services";

function Protected({ children }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { tokenLogin } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("user_tok")) {
      tokenLogin(localStorage.getItem("user_tok"));
    }
  }, []);

  return children;
}
export default Protected;
