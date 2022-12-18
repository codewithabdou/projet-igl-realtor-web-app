import React from "react";
import { Route, Routes } from "react-router-dom";
import {Layout} from "./components";
import { Home,SignIn,SignUp } from "./routes";
import { ROUTES } from "./constants";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME.path} element={<Home/>}/>
        <Route path={ROUTES.SIGNIN.path} element={<SignIn/>}/>
        <Route path={ROUTES.SIGNUP.path} element={<SignUp/>}/>
      </Routes>
    </Layout>
  );
};

export default App;
