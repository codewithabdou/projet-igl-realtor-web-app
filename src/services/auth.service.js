import { useGoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import axios from "axios";
import  UserContext  from "../global/userContext";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data: data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        var formdata = new FormData();
        formdata.append("email", data.email);
        formdata.append("first_name", data.given_name);
        formdata.append("family_name", data.family_name);
        formdata.append("image", data.picture);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch("https://annonces-immobilieres-hadjerl.vercel.app/login/", {
          ...requestOptions,
        })
          .then((response) => response.json())
          .then((result) => {
            tokenLogin(result, true);
          })
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.log(error);
      }
    },
  });

  const logout = () => {
    navigate(ROUTES.HOME.path);
    googleLogout();
    localStorage.removeItem("user_tok");
    setUser(null);
  };

  const tokenLogin = (token, goMarket) => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `token ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://annonces-immobilieres-hadjerl.vercel.app/find_user/",
      requestOptions
    )
      .then((response) => {
        if (response.status === 401) {
          logout();
          throw Error("Invalid token");
        }
        return response.text();
      })
      .then((result) => {
        setUser(JSON.parse(result));
        localStorage.setItem("user_tok", token);
        if (goMarket) navigate(ROUTES.MARKET.path);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  };

  return { login, logout, tokenLogin, loading };
}

export default useAuth;
