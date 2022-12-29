import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { DZ_COMMUNES, DZ_WILAYAS } from "../constants";
import { format } from "date-fns";
import DatePicker from "react-date-picker";
import { AiFillCloseCircle } from "react-icons/ai";

const Filter = () => {
  const [selectedWilayaCode, setSelectedWilayaCode] = useState(0);
  const [selectedWilayaName, setSelectedWilayaName] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBeforeDay, setSelectedBeforeDay] = useState(null);
  const [selectedAfterDay, setSelectedAfterDay] = useState(null);

  useEffect(() => {
    console.log(
      selectedType,
      selectedCommune,
      selectedWilayaName,
      selectedWilayaCode,
      selectedCategory,
      format(
        selectedAfterDay
          ? selectedAfterDay
          : new Date("January 01, 2023 00:00:00"),
        "MM/dd/yyyy"
      ),
      format(
        selectedBeforeDay
          ? selectedBeforeDay
          : new Date("December 31, 2025 23:59:59"),
        "MM/dd/yyyy"
      )
    );
  }, [
    selectedType,
    selectedCommune,
    selectedWilayaName,
    selectedWilayaCode,
    selectedCategory,
    selectedAfterDay,
    selectedBeforeDay,
  ]);

  const categories = [
    {
      value: "sale",
      label: "Sale",
    },
    {
      value: "exchange",
      label: "Exchange",
    },
    {
      value: "rental",
      label: "Rental",
    },
    {
      value: "rental-for-holidays",
      label: "Rental for holidays",
    },
  ];

  const types = [
    {
      value: "land",
      label: "Land",
    },
    {
      value: "farmland",
      label: "Farmland",
    },
    {
      value: "apartment",
      label: "Apartment",
    },
    {
      value: "house",
      label: "House",
    },
    {
      value: "bungalow",
      label: "Bungalow",
    },
  ];

  return (
    <div className="grid w-[90%] grid-cols-2 items-center justify-items-center gap-y-4 rounded-xl border-[1px] border-darkBlue bg-secondary_5 py-8 md:grid-cols-3 lg:w-[80%]">
      <div>
        <p className="pl-4 pb-2 text-xs tracking-wide text-darkBlue underline">
          City :
        </p>

        <Select
          allowClear
          className="h-8 w-36"
          showSearch
          placeholder="City"
          options={DZ_WILAYAS}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onSelect={(value) => {
            setSelectedWilayaCode(Number(value));
            setSelectedWilayaName(DZ_WILAYAS[Number(value) - 1].label);
          }}
          onClear={() => {
            setSelectedWilayaCode(0);
            setSelectedWilayaName(null);
            setSelectedCommune(null);
          }}
        />
      </div>

      <div>
        <p className="pl-4 pb-2 text-xs tracking-wide text-darkBlue underline">
          Town :
        </p>
        <Select
          allowClear
          showSearch
          className="h-8 w-36"
          placeholder="Town"
          options={DZ_COMMUNES[selectedWilayaCode - 1]}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onSelect={(value) => {
            setSelectedCommune(value);
          }}
          onClear={() => {
            setSelectedCommune(null);
          }}
        />
      </div>

      <div>
        <p className="pl-4 pb-2 text-xs tracking-wide text-darkBlue underline">
          Type :
        </p>

        <Select
          allowClear
          showSearch
          className="h-8 w-36"
          placeholder="Type"
          options={types}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onSelect={(value) => {
            setSelectedType(value);
          }}
          onClear={() => {
            setSelectedType(null);
          }}
        />
      </div>
      <div>
        <p className="pl-4 pb-2 text-xs tracking-wide text-darkBlue underline">
          Category :
        </p>

        <Select
          allowClear
          showSearch
          className="h-8 w-36"
          placeholder="Category"
          options={categories}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onSelect={(value) => {
            setSelectedCategory(value);
          }}
          onClear={() => {
            setSelectedCategory(null);
          }}
        />
      </div>
      <div>
        <p className="pl-4 pb-2 text-xs tracking-wide text-darkBlue underline">
          Published after :
        </p>
        <DatePicker
          calendarClassName={"border-[1px] rounded-xl"}
          clearIcon={<AiFillCloseCircle className="cursor-pointer" size={15} />}
          calendarIcon={null}
          className="h-8 w-36 bg-white"
          onChange={(day) => {
            setSelectedAfterDay(day);
          }}
          value={selectedAfterDay}
        />
      </div>
      <div>
        <p className="pl-4 pb-2 text-xs tracking-wide text-darkBlue underline">
          Published before :
        </p>
        <DatePicker
          calendarClassName={"border-[1px] rounded-xl"}
          clearIcon={<AiFillCloseCircle className="cursor-pointer" size={15} />}
          calendarIcon={null}
          className="h-8 w-36 bg-white"
          onChange={(day) => {
            setSelectedBeforeDay(day);
          }}
          value={selectedBeforeDay}
        />
      </div>
    </div>
  );
};

export default Filter;
