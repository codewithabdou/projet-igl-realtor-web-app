import React, { useContext } from "react";
import { Protected } from "../components";
import { UserContext } from "../global/userContext";

const Market = () => {
  const { user } = useContext(UserContext);

  return (
    <Protected>
      <div>{user?.name}</div>
    </Protected>
  );
};

export default Market;
