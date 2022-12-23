import React, { useContext } from "react";
import { UserContext } from "../global/userContext";

const Market = () => {
  const {user} = useContext(UserContext);

  return <div>{user.name}</div>;
};

export default Market;
