import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IMAGES } from "../constants";
import { getAnnouncementInfo } from "../services";
import { Carousel } from "react-responsive-carousel";
import Map, { NavigationControl, Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "maplibre-gl/dist/maplibre-gl.css";

const AdInfo = () => {
  const { adid } = useParams();
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    getAnnouncementInfo(adid).then((data) => {
      console.log(data[0]);
      setAnnouncement(data[0]);
    });
  }, []);
  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col gap-y-8 py-10 px-4 md:px-10">
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 xl:grid-cols-2">
        <div className="col-span-1 flex flex-col space-y-2 ">
          <div className="flex items-center gap-x-2">
            <h1 className="text-base font-semibold text-darkBlue">Title : </h1>
            <p>{announcement?.title}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-center text-base font-semibold text-darkBlue">
              Category :{" "}
            </h1>
            <p className="text-center">{announcement?.category.cat_name}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-center text-base font-semibold text-darkBlue">
              Type :{" "}
            </h1>
            <p className="text-center">{announcement?.type.type_name}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-center text-base font-semibold text-darkBlue">
              Property Address :{" "}
            </h1>
            <p className="text-center">
              {announcement?.location.address.address}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-center text-base font-semibold text-darkBlue">
              City :{" "}
            </h1>
            <p className="text-center">{announcement?.location.wilaya}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-center text-base font-semibold text-darkBlue">
              Town :{" "}
            </h1>
            <p className="text-center">{announcement?.location.commune}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-center text-base font-semibold text-darkBlue">
              Price :{" "}
            </h1>
            <p className="text-center">{announcement?.price} DZD</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-center text-base font-semibold text-darkBlue">
              Area :{" "}
            </h1>
            <p className="text-center">{announcement?.area} square metre</p>
          </div>
          <div className="flex-col items-center space-x-2">
            <span className="mr-2 text-center text-base font-semibold text-darkBlue">
              Description :
            </span>
            {announcement?.description}
          </div>
          <div className="flex-col items-center space-x-2">
            <span className="mr-2 text-center text-base font-semibold text-darkBlue">
              Contact :
            </span>
            {announcement?.contact}
          </div>
          <div className="flex-col items-center space-x-2">
            <span className="mr-2 text-center text-base font-semibold text-darkBlue">
              Creation date :
            </span>
            {announcement?.creation_date.substring(0, 10)}
          </div>
          <div className="my-4 flex w-full  flex-col gap-y-2 justify-self-center rounded-3xl border-[1px] border-darkBlue p-4">
            <label className=" text-base font-semibold text-darkBlue">
              Your email :
            </label>
            <input type="email" />
            <label className=" text-base font-semibold text-darkBlue">
              Your message :
            </label>
            <textarea
              className="px-2"
              placeholder="Ex : i am interested ...."
              type="text"
            />
            <button
              className={`mt-4 w-24 ${"cursor-pointer"} self-center rounded-full border-2 border-darkBlue py-1 px-2 font-semibold text-darkBlue transition duration-300 hover:bg-darkBlue hover:text-secondary_1`}
            >
              Send
            </button>
          </div>
        </div>
        <div>
          <Carousel showArrows={true}>
            {announcement?.images.map((image, index) => (
              <div key={index}>
                <img src={image} className="object-cover" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div>
        {announcement && (
          <Map
            mapLib={maplibregl}
            initialViewState={{
              longitude: announcement?.location.address.longitude,
              latitude: announcement?.location.address.latitude,
              zoom: 14,
            }}
            style={{ width: "100%", height: " calc(80vh)" }}
            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=Ga5ju1aY284Hg50g61bp"
          >
            <NavigationControl position="top-left" visualizePitch />
            <Marker
              latitude={announcement?.location.address.latitude}
              longitude={announcement?.location.address.longitude}
            ></Marker>
          </Map>
        )}
      </div>
    </div>
  );
};

export default AdInfo;
