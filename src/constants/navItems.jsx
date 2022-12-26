import {
  MdHome,
  MdFavorite,
  MdContactMail,
  MdAddBusiness,
  MdHelp,
} from "react-icons/md";
import { FaAdversal } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { useAuth } from "../services";
import ROUTES from "./routes";
import { Link } from "react-router-dom";

const useNav = () => {
  const { logout } = useAuth();

  const NOAUTHMOBILEITEMS = [
    {
      key: "1",
      label: (
        <Link to={ROUTES.HOME.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <MdHome />
            <p>Home</p>
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={ROUTES.SOONAV.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <RiCustomerService2Fill />
            <p>Contact Service</p>
          </div>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to={ROUTES.SOONAV.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <FaAdversal />
            <p>Advertise</p>
          </div>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to={ROUTES.SOONAV.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <AiFillSetting />
            <p>Settings</p>
          </div>
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link to={ROUTES.SOONAV.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <MdHelp />
            <p>Help</p>
          </div>
        </Link>
      ),
    },
  ];
  const AUTHMOBILEITEMS = [
    {
      key: "1",
      label: (
        <Link to={ROUTES.MARKET.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <MdHome />
            <p>Home</p>
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={ROUTES.MYADS.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <ImProfile />
            <p>My ads</p>
          </div>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to={ROUTES.FAVORITE.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <MdFavorite />
            <p>Favorite ads</p>
          </div>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to={ROUTES.RECEPTION.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <MdContactMail />
            <p>Reception</p>
          </div>
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link to={ROUTES.ADFORM.path}>
          <div className="flex items-center space-x-4 font-semibold text-darkBlue">
            <MdAddBusiness />
            <p>Create new ad</p>
          </div>
        </Link>
      ),
    },
    {
      key: "6",
      label: (
        <Link to={ROUTES.SOONAV.path}>
          <div className="flex items-center space-x-4  border-b-[1px] border-gray pb-4 font-semibold text-darkBlue">
            <AiFillSetting />
            <p>Settings</p>
          </div>
        </Link>
      ),
    },
    {
      key: "7",
      label: (
        <div className="flex items-center justify-center pt-1">
          <button
            className="rounded-3xl border-[1px] border-secondary_2  bg-white px-4 py-1 font-semibold text-darkBlue transition duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-sm hover:shadow-darkBlue"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      ),
    },
  ];
  const AUTHITEMS = [
    {
      name: "Home",
      icon: <MdHome />,
      route: ROUTES.MARKET.path,
    },
    {
      name: "My ads",
      icon: <ImProfile />,
      route: ROUTES.MYADS.path,
    },
    {
      name: "Favorite ads",
      icon: <MdFavorite />,
      route: ROUTES.FAVORITE.path,
    },
    {
      name: "Reception",
      icon: <MdContactMail />,
      route: ROUTES.RECEPTION.path,
    },
    {
      name: "Create new ad",
      icon: <MdAddBusiness />,
      route: ROUTES.ADFORM.path,
    },
    {
      name: "Settings",
      icon: <AiFillSetting />,
      route: ROUTES.SOONAV.path,
    },
  ];
  const NOAUTHITEMS = [
    {
      name: "Home",
      icon: <MdHome />,
      route: ROUTES.HOME.path,
    },
    {
      name: "Contact service",
      icon: <RiCustomerService2Fill />,
      route: ROUTES.SOONAV.path,
    },
    {
      name: "Advertise",
      icon: <FaAdversal />,
      route: ROUTES.SOONAV.path,
    },
    {
      name: "Settings",
      icon: <AiFillSetting />,
      route: ROUTES.SOONAV.path,
    },
    {
      name: "Help",
      icon: <MdHelp />,
      route: ROUTES.SOONAV.path,
    },
  ];
  return { AUTHITEMS, NOAUTHITEMS, AUTHMOBILEITEMS, NOAUTHMOBILEITEMS };
};

export default useNav;
