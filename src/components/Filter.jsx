import React, { useState } from "react";
import { Select } from "antd";
import { DZ_COMMUNES, DZ_WILAYAS } from "../constants";
import DatePicker from "react-date-picker";
import { AiFillCloseCircle } from "react-icons/ai";

const Filter = ({
  setSelectedCommune,
  setSelectedType,
  setSelectedCategory,
  setSelectedWilayaName,
  selectedBeforeDay,
  setSelectedBeforeDay,
  selectedAfterDay,
  setSelectedAfterDay,
}) => {
  const [selectedWilayaCode, setSelectedWilayaCode] = useState(0);
  const categories = [
    {
      value: "1",
      label: "For sale",
    },
    {
      value: "2",
      label: "For rent",
    },
    {
      value: "3",
      label: "For exchange",
    },
    {
      value: "4",
      label: "Rent for vacations",
    },
  ];

  const types = [
    {
      value: "1",
      label: "Land",
    },
    {
      value: "2",
      label: "Farmland",
    },
    {
      value: "3",
      label: "Flat",
    },
    {
      value: "4",
      label: "House",
    },
    {
      value: "5",
      label: "Bungalow",
    },
  ];

  return (
    <div className="grid w-[90%] grid-cols-2 items-center justify-items-center gap-y-4 rounded-md border-[1px] border-darkBlue py-8 md:grid-cols-3 lg:w-[80%]">
      <div>
        <p className="pl-4 pb-2 text-sm tracking-wide text-darkBlue underline">
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
        <p className="pl-4 pb-2 text-sm tracking-wide text-darkBlue underline">
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
        <p className="pl-4 pb-2 text-sm tracking-wide text-darkBlue underline">
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
        <p className="pl-4 pb-2 text-sm tracking-wide text-darkBlue underline">
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
        <p className="pl-4 pb-2 text-sm tracking-wide text-darkBlue underline">
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
        <p className="pl-4 pb-2 text-sm tracking-wide text-darkBlue underline">
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
