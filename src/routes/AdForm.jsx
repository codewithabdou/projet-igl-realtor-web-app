import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DZ_COMMUNES, DZ_WILAYAS } from "../constants";
import ImageUploading from 'react-images-uploading';


const AdForm = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <select {...register("category")}>
          {categories.map((cat, index) => (
            <option key={index} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <select {...register("type")}>
          {types.map((type, index) => (
            <option key={index} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <input type={"number"} {...register("area")} />
        <textarea type={"text"} {...register("description")} />
        <input type={"number"} {...register("price")} />
        <input type={"text"} {...register("firstName")} />
        <input type={"text"} {...register("lastName")} />
        <input type={"email"} {...register("email")} />
        <input type={"number"} {...register("phoneNumber")} />
        <select  {...register("city")}>
          {DZ_WILAYAS.map((city, index) => (
            <option key={index} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
        <select {...register("town")}>
          {DZ_COMMUNES[Number(watch().city)-1? Number(watch().city)-1 : 0].map((town, index) => (
            <option key={index} value={town.value}>
              {town.label}
            </option>
          ))}
        </select>
        <input type={"text"} {...register("adress")} />
        <div className="App">
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
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>


        <input type="submit" />
      </form>
    </div>
  );
};

export default AdForm;
