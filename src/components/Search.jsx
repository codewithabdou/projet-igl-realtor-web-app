import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, Tooltip } from "antd";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };
  return (
    <div className="flex h-12 lg:w-[80%] w-[90%] justify-between overflow-x-hidden rounded-lg border-[1px] border-darkBlue bg-secondary_5">
      <div className={`flex h-full gap-2 overflow-auto p-2`}>
        {inputVisible && (
          <Input
            ref={inputRef}
            type="text"
            className="w-24 min-w-[6rem]"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            className="flex w-fit items-center justify-center space-x-2 border-[1px] border-darkBlue text-darkBlue"
            onClick={showInput}
          >
            <PlusOutlined />
            <div>Add key-word</div>
          </Tag>
        )}
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                className="w-24"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              className="flex items-center justify-between space-x-2 border-[1px] border-darkBlue text-darkBlue"
              key={tag}
            >
              <span
                onDoubleClick={(e) => {
                  e.preventDefault();
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
              <AiFillCloseCircle
                className="cursor-pointer"
                size={15}
                onClick={() => handleClose(tag)}
              />
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </div>
      <div className="flex min-w-[2.5rem] cursor-pointer items-center justify-center border-l-[1px] border-l-darkBlue ">
        <FaSearch className="text-darkBlue" />
      </div>
    </div>
  );
};
export default Search;
