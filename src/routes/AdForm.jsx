import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DZ_COMMUNES, DZ_WILAYAS } from "../constants";
import ImageUploading from "react-images-uploading";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IMAGES } from "../constants";
import { AiFillCloseCircle } from "react-icons/ai";

const AdForm = () => {
  const [formPage, setFormPage] = useState(0);
  const [images, setImages] = useState([]);
  const maxNumber = 10;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onChange = (imageList) => {
    setImages(imageList);
  };
  const onSubmit = (data) => {
    console.log(data);
    console.log(images);
  };

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
    <div className=" grid min-h-[calc(100vh-5rem)] w-[98%] translate-x-[1%] grid-cols-1 items-center justify-items-center gap-y-4 pb-2  pt-4 md:grid-cols-2 md:pb-0">
      <div className="flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-center text-xl font-bold text-darkBlue xl:text-4xl xl:leading-relaxed">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </h1>
        <img
          src={IMAGES.ADFORM}
          alt="adform"
          className="col-span-1 h-auto w-96 rounded-2xl object-cover shadow-lg md:shadow-2xl"
        />
        <p className=" font-semibold text-darkBlue md:text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
          laudantium sequi sit inventore. Vero, praesentium quia molestias unde
          quidem delectus rerum officia sed recusandae, voluptatem aspernatur,
          deserunt impedit necessitatibus maiores!
        </p>
      </div>
      <form
        className="relative col-span-1 flex h-[98%] w-[98%] flex-col gap-2 rounded-3xl border-[1px] border-darkBlue bg-secondary_1 px-8 pt-3 pb-8 shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between">
          {formPage ? (
            <FaArrowCircleLeft
              onClick={() => {
                setFormPage((c) => c - 1);
              }}
              size={30}
              className="cursor-pointer rounded-full text-darkBlue transition duration-300 hover:scale-110 hover:bg-darkBlue hover:text-secondary_1"
            />
          ) : (
            <div></div>
          )}
          {formPage < 2 ? (
            <FaArrowCircleRight
              onClick={() => {
                setFormPage((c) => c + 1);
              }}
              size={30}
              className="cursor-pointer rounded-full text-darkBlue transition duration-300 hover:scale-110 hover:bg-darkBlue hover:text-secondary_1"
            />
          ) : (
            <div></div>
          )}
        </div>
        {!formPage ? (
          <>
            {" "}
            <div className="flex flex-col gap-1 text-darkBlue">
              <p className="pl-4  underline">Category :</p>
              <select
                className="w-[98%] rounded-2xl border-[1px] border-darkBlue py-2"
                {...register("category",{required : true})}
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
                {...register("type",{required : true})}
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
                {...register("area",{required : true})}
              />
            </div>
            <div className="flex flex-col gap-1 text-darkBlue">
              <p className="pl-4 underline">City :</p>
              <select
                className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
                {...register("city",{required : true})}
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
                {...register("town",{required : true})}
              >
                {DZ_COMMUNES[
                  Number(watch().city) - 1 ? Number(watch().city) - 1 : 0
                ].map((town, index) => (
                  <option key={index} value={town.value}>
                    {town.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 text-darkBlue">
              <p className="pl-4 underline">Adress :</p>
              <input
                className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
                type={"text"}
                {...register("adress",{required : true})}
              />
            </div>
            <div className="flex flex-col gap-1 text-darkBlue">
              <p className="pl-4 underline">Price (DZA) :</p>
              <input
                className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
                type={"number"}
                {...register("price",{required : true})}
              />
            </div>
          </>
        ) : formPage === 1 ? (
          <>
            <div className="flex flex-col gap-1 text-darkBlue">
              <p className="pl-4 underline">Description :</p>
              <textarea
                className=" h-44 w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
                type={"text"}
                {...register("description",{required : true})}
              />
            </div>
            <div className="flex flex-col gap-1 text-darkBlue">
              <p className="pl-4 underline">First Name :</p>
              <input
                className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
                type={"text"}
                {...register("firstName",{required : true})}
              />
            </div>
            <div className="flex flex-col gap-1 text-darkBlue">
              <p className="pl-4 underline">Last Name :</p>
              <input
                className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
                type={"text"}
                {...register("lastName",{required : true})}
              />
            </div>
            <div className="flex flex-col gap-1 text-darkBlue">
              <p className="pl-4 underline">Email adress :</p>
              <input
                className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
                type={"email"}
                {...register("email",{required : true})}
              />
            </div>
            <div className="flex flex-col gap-1 text-darkBlue">
              <p className="pl-4 underline">Phone number :</p>
              <input
                className="w-[98%] rounded-2xl border-[1px] border-darkBlue px-2 py-2"
                type={"number"}
                {...register("phoneNumber",{required : true,      maxLength : {
                  value: 2,
                  message: 'error message' // JS only: <p>error message</p> TS only support string
                }})}
                />
            </div>
          </>
        ) : (
          <>
            <p className="pl-4 text-darkBlue underline">property images :</p>
            <div className="mb-10 flex h-fit justify-center  gap-4 border-[1px] border-darkBlue pb-4">
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
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className=" w-full">
                    <button
                      className="h-24 w-full border-b-[1px] text-darkBlue"
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
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
            <input
              className="w-24 cursor-pointer self-center rounded-full border-2 border-darkBlue py-1 px-2 font-semibold text-darkBlue hover:bg-darkBlue hover:text-secondary_1"
              type="submit"
            />
          </>
        )}
      </form>
    </div>
  );
};

export default AdForm;
