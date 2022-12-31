import { useGoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../global/userContext";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

function useAuth() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const { data: data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        console.log(data)
        setUser(data);
        setLoading(false);

        /*
          #send user to backend and wait for response 
        */
        navigation(ROUTES.MARKET.path);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const logout = () => {
    googleLogout();
    navigation(ROUTES.HOME.path);
    setUser(null);
  };

  return { login, user, loading, logout };
}

export default useAuth;
