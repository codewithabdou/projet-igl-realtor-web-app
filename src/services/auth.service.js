import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function useAuth() {
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
        /*
          #authenticated = true 
          #send user to backend and wait for response 
          #navigate to user home or admin home
        */
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return login;
}

export default useAuth;
