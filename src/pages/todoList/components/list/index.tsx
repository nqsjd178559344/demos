import React from "react";
import { Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./index.less";

interface Props {
  title: string;
  todoList: any;
  handleChange: any;
  handleDel: any;
}

const List = (props: Props) => {
  const { todoList, title, handleChange, handleDel } = props;
  return (
    <>
      <div className="title">
        <h3>{title}</h3>
        <span className="totalCount">{todoList.length}</span>
      </div>
      <ul className="todoList">
        {todoList.map((item: any) => {
          return (
            <li key={item.id}>
              <Checkbox
                className="checkBox"
                onChange={() => handleChange(item)}
              />
              <div className="detail">{item.value}</div>
              <DeleteOutlined
                className="del"
                onClick={() => handleDel(item, "todoList")}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default List;
