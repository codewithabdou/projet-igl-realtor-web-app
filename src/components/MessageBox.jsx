import React from "react";
import { Divider } from "antd";
import moment from "moment/moment";

const MessageBox = ({ details }) => {
  return (
    <div className=" flex h-24 w-full flex-col space-y-2 px-4">
      <Divider />
      <div className="flex w-full items-center space-x-8  ">
        <h1 className="font-semibold text-darkBlue">
          {details.sent_by.first_name +
            " " +
            details.sent_by.family_name +
            " <" +
            details.title +
            " >"}
        </h1>
        <p className=" text-sm font-semibold text-slate-400">
          {moment(details.created_at).startOf("ss").fromNow()}
        </p>
      </div>
      <p className="indent-8">{details.content}</p>
      <Divider />
    </div>
  );
};

export default MessageBox;
