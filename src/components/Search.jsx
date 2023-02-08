import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, Tooltip } from "antd";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Search = ({ tags, setTags }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const [inTags, setInTags] = useState([]);
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

  const onSearchClick = () => {
    setTags(inTags);
  };

  const handleClose = (removedTag) => {
    const newTags = inTags.filter((tag) => tag !== removedTag);
    setInTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && inTags.indexOf(inputValue) === -1) {
      setInTags([...inTags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...inTags];
    newTags[editInputIndex] = editInputValue;
    setInTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };
  return (
    <div className="flex h-12 w-[90%] justify-between overflow-x-hidden rounded-md border-[1px] border-darkBlue lg:w-[80%]">
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
        {inTags.map((tag, index) => {
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
      <div
        onClick={onSearchClick}
        className="flex min-w-[2.5rem] cursor-pointer items-center justify-center border-l-[1px] border-l-darkBlue text-darkBlue transition duration-300 hover:bg-darkBlue hover:text-secondary_1 "
      >
        <FaSearch className="transition duration-300 hover:scale-110" />
      </div>
    </div>
  );
};
export default Search;
