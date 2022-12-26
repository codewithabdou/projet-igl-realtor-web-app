import React from "react";
import { ROUTES, IMAGES, useNav } from "../../constants";
import { Link } from "react-router-dom";
import { useAuth } from "../../services";
import { Dropdown } from "antd";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const { user } = useAuth();
  const { AUTHITEMS, NOAUTHITEMS, AUTHMOBILEITEMS, NOAUTHMOBILEITEMS } =
    useNav();

  return (
    <div className="flex h-20 w-full items-center justify-between overflow-hidden rounded-b-3xl border-b-[1px] border-b-secondary_7 bg-secondary_5 px-6 shadow-lg md:px-10">
      <div>
        <Link to={user ? ROUTES.MARKET.path : ROUTES.HOME.path}>
          <img
            src={IMAGES.LOGO.PRIMARY}
            alt="LOGO"
            className="h-20 w-20 object-contain md:h-24 md:w-24"
          />
        </Link>
      </div>
      <div className="h-full">
        <div className="hidden h-full items-center justify-between space-x-20 xl:flex">
          <ul className="flex h-full items-center justify-center space-x-10">
            {(user ? AUTHITEMS : NOAUTHITEMS).map((item, index) => (
              <Link to={item.route}>
                <li
                  className="relative flex h-[50%] cursor-pointer items-center justify-center space-x-2 text-lg font-semibold text-darkBlue transition duration-300 after:absolute after:top-full after:h-0.5 after:w-[80%] after:scale-x-0 after:rounded-full after:bg-secondary_2 after:transition after:duration-300 hover:-translate-y-1 hover:scale-110 hover:after:scale-x-100"
                  key={index}
                >
                  <div>{item.icon}</div>
                  <p>{item.name}</p>
                </li>
              </Link>
            ))}
          </ul>
          <div className={user ? "block" : "hidden"}>
            {AUTHMOBILEITEMS[AUTHMOBILEITEMS.length - 1].label}
          </div>
        </div>
        <Dropdown
          className=" flex h-full  items-center justify-center xl:hidden"
          menu={{
            items: user ? AUTHMOBILEITEMS : NOAUTHMOBILEITEMS,
            selectable: true,
            defaultSelectedKeys: ["1"],
            style: {
              backgroundColor: "#c0d5de",
              borderWidth: "1px",
              borderColor: "#6ea8bd",
            },
          }}
        >
          <div className="h-full">
            <MdMenu className=" h-10 w-10  text-darkBlue" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
