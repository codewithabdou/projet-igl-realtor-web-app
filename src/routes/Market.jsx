import React, { useContext } from "react";
import { Protected } from "../components";
import { UserContext } from "../global/userContext";
import Search from "../components/Search";

const Market = () => {
  const { user } = useContext(UserContext);

  return (
    <Protected>
      <div className="h-[calc(100vh-5rem)] flex flex-col items-center pt-6 bg-secondary_1">
        <Search></Search>
        <div>{user?.name}</div>
      </div>
    </Protected>
  );
};

export default Market;
