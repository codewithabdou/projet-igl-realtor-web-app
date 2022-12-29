import React, { useContext } from "react";
import { Protected } from "../components";
import { UserContext } from "../global/userContext";
import {Search,Filter} from "../components";

const Market = () => {
  const { user } = useContext(UserContext);

  return (
    <Protected>
      <div className="h-[calc(100vh-5rem)] flex flex-col items-center pt-10 bg-secondary_1 gap-y-8">
        <Search/>
        <Filter/>
        <div>{user?.name}</div>
      </div>
    </Protected>
  );
};

export default Market;
