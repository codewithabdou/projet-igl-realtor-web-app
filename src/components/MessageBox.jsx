import React from "react";
import { Divider } from "antd";
import moment from "moment/moment";

const MessageBox = ({ details }) => {
  //     content
  // :
  // "yo"
  // created_at
  // :
  // "2023-02-01T17:23:32.102020Z"
  // sent_by
  // :
  // email
  // :
  // "khaledhabouche08@gmail.com"
  // family_name
  // :
  // "Dzz"
  // first_name
  // :
  // "Abdou"
  // id
  // :
  // 4
  // [[Prototype]]
  // :
  // Object
  // sent_to
  // :
  // 4
  // status
  // :
  // "Pending"
  // title
  // :
  // "hghgg"
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
      <p className="indent-8">
        {details.content} Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Laborum a, sit ab tempore quis porro eaque fugiat error. Iusto qui
        delectus doloribus reiciendis debitis fugiat obcaecati optio modi dolore
        quo.
      </p>
      <Divider />
    </div>
  );
};

export default MessageBox;
