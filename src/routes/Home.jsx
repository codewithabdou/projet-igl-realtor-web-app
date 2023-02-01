import React, { useEffect } from "react";
import { IMAGES, ROUTES } from "../constants";
import { useAuth } from "../services";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { login, tokenLogin, loading} = useAuth();

  useEffect(() => {
    if (localStorage.getItem("user_tok")!==null) {
      navigate(ROUTES.MARKET.path)
      tokenLogin(localStorage.getItem("user_tok"));
    }
  }, []);

  if (loading)
    return (
      <div className="flex h-[calc(100vh-5rem)] items-center justify-center">
        <Spin tip="Loading" size="large" className="text-darkBlue" />
      </div>
    );
  else
    return (
      <div className="grid h-[calc(100vh-5rem)] grid-cols-1 items-center justify-items-center xl:grid-cols-2">
        <div className="col-span-1 flex h-full w-full flex-col items-center justify-center space-y-10 px-4 py-4">
          <h1 className="text-center text-xl font-bold text-darkBlue xl:text-5xl xl:leading-relaxed">
            No One Has More Experience Or Expertise To Help You Than An Agent
            Who Is A Realtor.
          </h1>
          <button
            className="rounded-3xl border-[1px]  border-secondary_2 px-4 py-2 font-semibold text-darkBlue transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-sm hover:shadow-darkBlue"
            onClick={login}
          >
            Continue with Google
          </button>{" "}
        </div>
        <div className="col-span-1 flex h-full w-full items-center justify-center">
          <img
            className="h-full w-full rounded-xl object-contain"
            src={IMAGES.HOME}
            alt="home"
          />
        </div>
      </div>
    );
};

export default Home;
