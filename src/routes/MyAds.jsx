import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IMAGES } from "../constants";
import { AiFillCloseCircle } from "react-icons/ai";
import { Spin, Modal } from "antd";
import {
  getMyAnnouncements,
  deleteAnnouncement,
  removeFavorite,
  addFavorite,
} from "../services";
import { useContext } from "react";
import  UserContext  from "../context/userContext";

const MyAds = () => {
  const { user } = useContext(UserContext);
  const [Announcements, setAnnouncements] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const showModal = (announcement) => {
    setAdToDelete(announcement);
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    deleteAnnouncement(adToDelete?.id)
      .then(() => {
        getMyAnnouncements()
          .then((e) => {
            setAnnouncements(e);
            setOpen(false);
            setConfirmLoading(false);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };
  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    setIsFetching(true);
    getMyAnnouncements()
      .then((data) => {
        setAnnouncements(data);
        setIsFetching(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const addFav = (id) => {
    addFavorite(id).then((data) => {
      setIsFetching(true);
      getMyAnnouncements()
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
      getMyAnnouncements()
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
        My Announcements
      </h1>
      {isFetching ? (
        <div className="mt-10 flex items-center justify-center">
          <Spin tip="Loading" size="large" className="text-darkBlue" />
        </div>
      ) : Announcements?.filter((announcement) => !announcement.deleted)
          .length ? (
        <div className="grid w-[80%] grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-2 xl:grid-cols-3">
          {Announcements?.filter((announcement) => !announcement.deleted).map(
            (Announcement) => (
              <div
                key={Announcement.id}
                className="relative col-span-1 my-2 flex  flex-col items-center justify-center gap-y-4 rounded-3xl border-[1px] border-darkBlue bg-white py-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Modal
                  title={`Do you really want to delete <${adToDelete?.title}> ?`}
                  open={open}
                  okText="Confirm"
                  okType="danger"
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <p>Confirm or cancel the deletion</p>
                </Modal>
                <AiFillCloseCircle
                  onClick={() => showModal(Announcement)}
                  size={30}
                  className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-secondary_1 text-darkBlue hover:bg-darkBlue hover:text-secondary_1"
                />
                <h1 className="mx-2 text-center text-3xl font-bold ">
                  {Announcement.title}
                </h1>
                <Link
                  className="flex w-full items-center justify-center"
                  to={`/adinfo/${Announcement.id}`}
                >
                  <div className="mx-4 h-48 w-[80%] cursor-pointer overflow-hidden rounded-lg shadow-md">
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
                <p className="px- w-[80%] overflow-clip whitespace-normal text-center  text-base">
                  {Announcement.description.length > 100
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
                      className="cursor-pointer text-rose-500 transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-rose-300"
                    />
                  ) : (
                    <MdFavoriteBorder
                      onClick={() => addFav(Announcement.id)}
                      size={30}
                      className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-rose-500"
                    />
                  )}{" "}
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

export default MyAds;
