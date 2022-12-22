import React from "react";
import { ROUTES, IMAGES } from "../../constants";
import { Link } from "react-router-dom";
import { useAuth } from "../../services";

const Navbar = () => {
  const auth = useAuth();
  return (
    <div className="flex h-20 w-full items-center justify-between overflow-hidden rounded-b-3xl border-b-secondary_7 border-b-[1px] bg-secondary_5 px-4 shadow-lg md:px-10">
      <div>
        <Link to={ROUTES.HOME.path}>
          <img src={IMAGES.LOGO.PRIMARY} alt="LOGO" className="md:h-20 md:w-24 h-20 w-20 object-contain" />
        </Link>
      </div>
      <div>
        <button
          className="rounded-3xl border-[1px] border-secondary_2  bg-white px-4 py-1 font-semibold text-darkBlue transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-sm hover:shadow-darkBlue"
          onClick={auth}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
