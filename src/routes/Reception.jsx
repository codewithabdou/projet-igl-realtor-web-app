import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MessageBox from "../components/MessageBox";
import { getReceivedMessages } from "../services";
import { Spin } from "antd";


const Reception = () => {
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    getReceivedMessages().then((data) => {
      setMessages(data.recieved_messages);
    });
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center gap-y-8 pb-10 pt-10">
      <h1 className="relative flex cursor-default items-center justify-center space-x-2 text-3xl font-bold text-darkBlue transition duration-300 after:absolute after:top-full after:h-0.5 after:w-[80%] after:scale-x-0 after:rounded-full after:bg-secondary_2 after:transition after:duration-300 hover:-translate-y-1 hover:scale-110 hover:after:scale-x-50">
        Reception
      </h1>
      {messages ? (
        messages?.map((message, index) => (
          <MessageBox key={index} details={message} />
        ))
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <Spin tip="Loading" size="large" className="text-darkBlue" />
        </div>
      )}
    </div>
  );
};

export default Reception;
