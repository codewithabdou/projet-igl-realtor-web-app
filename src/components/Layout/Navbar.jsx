import React from "react";
import { ROUTES, IMAGES } from "../../constants";
import { Link } from "react-router-dom";
import { useAuth } from "../../services";

const Navbar = () => {
  const auth = useAuth();
  return (
    <div className="flex h-20 w-full items-center justify-between overflow-hidden rounded-b-3xl border-[1px] border-red bg-[white] px-4 shadow-lg md:px-10">
      <div>
        <Link to={ROUTES.HOME.path}>
          <img src={IMAGES.LOGO} alt="LOGO" className="h-24 w-24" />
        </Link>
      </div>
      <div>
        <button
          className="rounded-3xl text-darkBlue  border-[1px] border-red px-4 py-1 font-semibold transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-sm hover:shadow-darkBlue"
          onClick={auth}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
