import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DZ_COMMUNES, DZ_WILAYAS, ROUTES } from "../constants";
import ImageUploading from "react-images-uploading";
import { AiFillCloseCircle } from "react-icons/ai";
import { createNewAnnouncement, autoComplete } from "../services";
import { useNavigate } from "react-router-dom";
import { AutoComplete } from "antd";

const AdForm = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [controller, setController] = useState(new AbortController());
  const maxNumber = 10;

  const { register, handleSubmit, watch } = useForm();

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const getNewOptions = (e) => {
    setAutoCompleteOptions([]);
    setController(new AbortController());
    if (e.length)
      autoComplete(e, controller.signal)
        .then((data) => {
          const array = data.features.map((feature) => ({
            value: feature.properties.address_line2,
            label: feature.properties.address_line2,
          }));
          const deduplicatedArray = [
            ...new Set(array.map((item) => item.value)),
          ].map((value) => {
            return array.find((item) => item.value === value);
          });
          setAutoCompleteOptions(deduplicatedArray);
        })
        .catch((e) => {
          if (e.name === "AbortError") {
            console.log("Fetch was cancelled");
          } else {
            console.log(e);
          }
        });
  };

  const onSubmit = (data) => {
    const details = {
      ...data,
      images: images.map((image) => image.file),
    };

    const formData = new FormData();
    let objectKeys = Object.keys(details);

    objectKeys.forEach((key) => {
      if (key !== "images") formData.append(key, details[key]);
    });

    details.images.forEach((image) => {
      formData.append("images", image, image.name);
    });

    if (details.images.length > 0) {
      setIsCreating(true);
      createNewAnnouncement(formData)
        .then((announcement) => {
          navigate(ROUTES.MARKET.path);
        })
        .catch((e) => console.log(e))
        .finally(() => setIsCreating(false));
    }
  };

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
    <div className="container  flex min-h-[calc(100vh-5rem)] w-[98%] translate-x-[1%] justify-center  pb-2  pt-4  md:pb-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex h-[97%] w-[98%] flex-col gap-2 border-darkBlue bg-secondary_1 px-8 pt-3 pb-8 shadow-lg"
      >
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Title :</p>
          <input
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            type={"text"}
            {...register("title", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4  underline">Category :</p>
          <select
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue py-2"
            {...register("category", { required: true })}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Type :</p>
          <select
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue py-2"
            {...register("type", { required: true })}
          >
            {types.map((type, index) => (
              <option key={index} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Area (square metre) :</p>
          <input
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            type={"number"}
            {...register("area", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">City :</p>
          <select
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            {...register("wilaya", { required: true })}
          >
            {DZ_WILAYAS.map((city, index) => (
              <option key={index} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Town :</p>
          <select
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            {...register("commune", { required: true })}
          >
            {DZ_COMMUNES[
              Number(watch().wilaya) - 1 ? Number(watch().wilaya) - 1 : 0
            ].map((town, index) => (
              <option key={index} value={town.value}>
                {town.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Adress :</p>
          <AutoComplete
            allowClear={true}
            bordered={true}
            options={autoCompleteOptions}
            onChange={getNewOptions}
            className="w-[98%]"
            children={
              <input
                className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2 text-darkBlue"
                type={"text"}
                {...register("adress", { required: true })}
              />
            }
          />
        </div>

        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Price (DZA) :</p>
          <input
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            type={"number"}
            {...register("price", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">First Name :</p>
          <input
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            type={"text"}
            {...register("firstName", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Last Name :</p>
          <input
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            type={"text"}
            {...register("lastName", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Email adress :</p>
          <input
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            type={"email"}
            {...register("email", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Personal adress :</p>
          <input
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            type={"text"}
            {...register("personal_address", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Phone number :</p>
          <input
            className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            type={"number"}
            {...register("phoneNumber", {
              required: true,
            })}
          />
        </div>

        <div className="flex flex-col gap-1 text-darkBlue">
          <p className="pl-4 underline">Description :</p>
          <textarea
            className=" h-44 w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
            type={"text"}
            {...register("description", { required: true })}
          />
        </div>
        <p className="pl-4 text-darkBlue underline">property images :</p>
        <div className="mb-10 flex h-fit w-[98%] justify-center  gap-4 border-[1px] border-darkBlue pb-4">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className=" w-full">
                <button
                  className="h-24 w-full border-b-[1px] text-darkBlue"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onImageUpload();
                  }}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                <div className="flex flex-wrap items-center justify-center gap-4 px-4 pt-4">
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center justify-center gap-2"
                    >
                      <AiFillCloseCircle
                        onClick={() => onImageRemove(index)}
                        size={20}
                        className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-secondary_1 text-darkBlue hover:bg-darkBlue hover:text-secondary_1"
                      />
                      <img
                        onClick={() => onImageUpdate(index)}
                        src={image["data_url"]}
                        alt=""
                        className=" h-32 w-auto cursor-pointer rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
        <button
          className={`mb-10 w-fit px-4 py-1 ${
            !isCreating ? "cursor-pointer" : "cursor-not-allowed"
          } self-center rounded-full border-2 border-darkBlue py-1 px-2 font-semibold text-darkBlue transition duration-300 hover:bg-darkBlue hover:text-secondary_1`}
          type="submit"
        >
          {!isCreating ? "Submit" : "Creating ..."}
        </button>
      </form>
    </div>
  );
};

export default AdForm;
