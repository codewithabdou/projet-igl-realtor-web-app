import React from "react";
import { Route, Routes } from "react-router-dom";
import {Layout} from "./components";
import { Home } from "./routes";
import { ROUTES } from "./constants";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME.path} element={<Home/>}/>
      </Routes>
    </Layout>
  );
};

export default App;
