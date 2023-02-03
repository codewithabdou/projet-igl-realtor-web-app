import React from "react";
import { Select, DatePicker } from "antd";
import { DZ_COMMUNES, DZ_WILAYAS } from "../constants";

const Filter = ({
  setSelectedCommune,
  setSelectedType,
  setSelectedCategory,
  setSelectedWilayaName,
  selectedBeforeDay,
  setSelectedBeforeDay,
  selectedAfterDay,
  setSelectedAfterDay,
  selectedWilayaCode,
  setSelectedWilayaCode,
}) => {
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
            setSelectedWilayaCode(value);
            setSelectedWilayaName(DZ_WILAYAS[Number(value) - 1].label);
          }}
          onClear={() => {
            setSelectedWilayaCode("");
            setSelectedWilayaName("");
            setSelectedCommune("");
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
          options={DZ_COMMUNES[Number(selectedWilayaCode) - 1]}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onSelect={(value) => {
            setSelectedCommune(value);
          }}
          onClear={() => {
            setSelectedCommune("");
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
            setSelectedType("");
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
            setSelectedCategory("");
          }}
        />
      </div>
      <div>
        <p className="pl-4 pb-2 text-sm tracking-wide text-darkBlue underline">
          Published after :
        </p>
        <DatePicker
          onChange={(date, _) => {
            setSelectedAfterDay(date?.toDate());
          }}
        />
      </div>
      <div>
        <p className="pl-4 pb-2 text-sm tracking-wide text-darkBlue underline">
          Published before :
        </p>
        <DatePicker
          onChange={(date, _) => {
            setSelectedBeforeDay(date?.toDate());
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
