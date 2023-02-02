import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IMAGES } from "../constants";
import { Spin } from "antd";
import { getFavorites,addFavorite,removeFavorite } from "../services";
import { useContext } from "react";
import { UserContext } from "../global/userContext";

const FavoriteAds = () => {
  const { user } = useContext(UserContext);
  const [Announcements, setAnnouncements] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    getFavorites()
      .then((data) => {
        setAnnouncements(data);
        setIsFetching(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const addFav = (id) => {
    addFavorite(id).then((data) => {
      setIsFetching(true);
      getFavorites()
        .then((a) => {
          setAnnouncements(a);
          setIsFetching(false);
        })
        .catch((e) => console.log(e));
    });
  };

  const removeFav = (id) => {
    removeFavorite(id).then((data) => {
      setIsFetching(true);
      getFavorites()
        .then((a) => {
          setAnnouncements(a);
          setIsFetching(false);
        })
        .catch((e) => console.log(e));
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center gap-y-8 pb-10 pt-10">
      <h1 className="relative flex cursor-default items-center justify-center space-x-2 text-3xl font-bold text-darkBlue transition duration-300 after:absolute after:top-full after:h-0.5 after:w-[80%] after:scale-x-0 after:rounded-full after:bg-secondary_2 after:transition after:duration-300 hover:-translate-y-1 hover:scale-110 hover:after:scale-x-50">
        Favorite Announcements
      </h1>
      {isFetching ? (
        <div className="mt-10 flex items-center justify-center">
          <Spin tip="Loading" size="large" className="text-darkBlue" />
        </div>
      ) : Announcements.length ? (
        <div className="grid w-[80%] grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-2 xl:grid-cols-3">
          {Announcements?.filter((announcement) => !announcement.deleted).map(
            (Announcement) => (
              <div
                key={Announcement.id}
                className="col-span-1 my-2 flex h-96 w-full flex-col items-center justify-center gap-y-4 rounded-3xl border-[1px] border-darkBlue bg-white py-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h1 className="mx-2 text-center text-3xl font-bold ">
                  {Announcement.title}
                </h1>
                <Link
                  className="f flex w-full cursor-pointer items-center justify-center"
                  to={`/adinfo/${Announcement.id}`}
                >
                  <div className="mx-4 h-48 w-[80%] overflow-hidden rounded-lg shadow-md">
                    <img
                      className="h-48 w-full object-cover"
                      src={
                        Announcement?.images.length
                          ? Announcement?.images[0]
                          : IMAGES.ADFORM
                      }
                      alt=""
                    />
                  </div>
                </Link>
                <p className="w-[80%] overflow-clip whitespace-normal px-2 text-center  text-base">
                  {Announcement.description.length >= 100
                    ? Announcement.description.substring(0, 100) + " ..."
                    : Announcement.description}
                </p>
                <div className="flex w-full items-center justify-between px-8">
                  <p className="text-gray">
                    {moment(Announcement.creation_date).startOf("ss").fromNow()}
                  </p>
                  {Announcement.favorated_by.includes(user.id) ? (
                    <MdFavorite
                      onClick={() => removeFav(Announcement.id)}
                      size={30}
                      className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-rose-300 text-rose-500"
                    />
                  ) : (
                    <MdFavoriteBorder
                      onClick={() => addFav(Announcement.id)}
                      size={30}
                      className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-rose-500"
                    />
                  )}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div> No announcements .</div>
      )}
    </div>
  );
};

export default FavoriteAds;
