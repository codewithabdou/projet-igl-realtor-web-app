import React, { useEffect } from "react";

import { useAuth } from "../services";

function Protected({ children }) {

  const { tokenLogin } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("user_tok")) {
      tokenLogin(localStorage.getItem("user_tok"));
    }
  }, []);

  return children;
}
export default Protected;
