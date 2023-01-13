import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../global/userContext";
import { Search, Filter } from "../components";
import { getAnnouncements } from "../services";
import { format } from "date-fns";

const Market = () => {
  const { user } = useContext(UserContext);
  const [tags, setTags] = useState([]);
  const [selectedWilayaName, setSelectedWilayaName] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBeforeDay, setSelectedBeforeDay] = useState("");
  const [selectedAfterDay, setSelectedAfterDay] = useState("");
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
      wilaya: selectedWilayaName,
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
    selectedWilayaName,
    selectedCategory,
    selectedAfterDay,
    selectedBeforeDay,
    tags,
  ]);

  useEffect(() => {
    console.log(details);
    getAnnouncements(details);
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
    <div className="flex h-[calc(100vh-5rem)] flex-col items-center gap-y-8 pt-10">
      <Search tags={tags} setTags={setTags} />
      <Filter
        selectedBeforeDay={selectedBeforeDay}
        selectedAfterDay={selectedAfterDay}
        setSelectedType={setSelectedType}
        setSelectedWilayaName={setSelectedWilayaName}
        setSelectedAfterDay={setSelectedAfterDay}
        setSelectedBeforeDay={setSelectedBeforeDay}
        setSelectedCategory={setSelectedCategory}
        setSelectedCommune={setSelectedCommune}
      />
      <div>{user?.first_name}</div>
    </div>
  );
};

export default Market;
