import React, { useEffect, useState } from "react";
import { Search, Filter } from "../components";
import { getAnnouncements } from "../services";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { GrFavorite } from "react-icons/gr";
import { IMAGES} from "../constants";
import { Spin } from "antd";

const Market = () => {
  const [tags, setTags] = useState([]);
  const [selectedWilayaName, setSelectedWilayaName] = useState("");
  const [selectedWilayaCode, setSelectedWilayaCode] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBeforeDay, setSelectedBeforeDay] = useState("");
  const [selectedAfterDay, setSelectedAfterDay] = useState("");
  const [Announcements, setAnnouncements] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    commune: "",
    wilaya: "",
    type: "",
    search: [],
    first_date: "",
    second_date: "",
    category: "",
  });

  useEffect(() => {
    setDetails({
      commune: selectedCommune,
      wilaya: selectedWilayaCode,
      type: selectedType,
      search: tags,
      first_date: format(
        selectedAfterDay ? selectedAfterDay : new Date("2023-01-01"),
        "yyyy-MM-dd"
      ),
      second_date: format(
        selectedBeforeDay ? selectedBeforeDay : new Date("2030-12-31"),
        "yyyy-MM-dd"
      ),
      category: selectedCategory,
    });
  }, [
    selectedType,
    selectedCommune,
    selectedWilayaCode,
    selectedCategory,
    selectedAfterDay,
    selectedBeforeDay,
    tags,
  ]);

  useEffect(() => {
    setIsFetching(true);
    getAnnouncements(details)
      .then((a) => {
        console.log(a);
        setAnnouncements(a);
        setIsFetching(false);
      })
      .catch((e) => console.log(e));
  }, [
    details.category,
    details.commune,
    details.first_date,
    details.search,
    details.second_date,
    details.type,
    details.wilaya,
  ]);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center gap-y-8 pb-10 pt-10">
      <Search tags={tags} setTags={setTags} />
      <Filter
        selectedBeforeDay={selectedBeforeDay}
        selectedAfterDay={selectedAfterDay}
        setSelectedType={setSelectedType}
        setSelectedWilayaName={setSelectedWilayaName}
        setSelectedWilayaCode={setSelectedWilayaCode}
        selectedWilayaCode={selectedWilayaCode}
        setSelectedAfterDay={setSelectedAfterDay}
        setSelectedBeforeDay={setSelectedBeforeDay}
        setSelectedCategory={setSelectedCategory}
        setSelectedCommune={setSelectedCommune}
      />

      {isFetching ? (
        <div className="mt-10 flex items-center justify-center">
          <Spin tip="Loading" size="large" className="text-darkBlue" />
        </div>
      ) : Announcements.length ? (
        <div className="grid w-[80%] grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-2 xl:grid-cols-3">
          {Announcements?.map((Announcement, index) => (
            <Link key={Announcement.id} to={`/adinfo/${Announcement.id}`}>
              <div className="col-span-1 h-96 my-2 flex cursor-pointer flex-col items-center justify-center gap-y-4 rounded-3xl border-[1px] border-darkBlue bg-white py-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h1 className="mx-2 text-center text-3xl font-bold ">
                  {Announcement.title}
                </h1>
                <div className="mx-4 h-48 w-[80%] overflow-hidden rounded-lg shadow-md">
                  <img className="object-cover w-full h-48" src={Announcement?.images.length ? Announcement?.images[0] : IMAGES.ADFORM} alt="" />
                </div>
                <p className="px-2 text-center  text-base">
                  {Announcement.description.length > 100
                    ? Announcement.description.substring(0, 100) + " ..."
                    : Announcement.description}
                </p>
                <div className="flex w-full items-center justify-between px-8">
                  <p className="text-gray">
                    {moment(Announcement.creation_date).startOf("ss").fromNow()}
                  </p>
                  <GrFavorite size={30} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div> No announcements .</div>
      )}
    </div>
  );
};

export default Market;
