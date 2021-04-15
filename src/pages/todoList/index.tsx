import React, { useEffect, useState } from "react";
import { Input, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./index.less";
import Item from "antd/lib/list/Item";

const TodoList = () => {
  const [id, setId] = useState(0);
  const [todo, setTodo] = useState("");
  // const initTodoList: any = [];
  // const [todoList, setTodoList] = useState(initTodoList);
  const [todoList, setTodoList] = useState<any>([])
  // const initHasDoList: any = [];
  // const [hasDoList, setHasDoList] = useState(initHasDoList);
  const [hasDoList, setHasDoList] = useState<any>([])
  const handlePressEnter = (e: any) => {
    const { value } = e.target;
    setTodo("");
    const target = {
      id,
      value,
    };
    setId(id + 1);
    setTodoList([...todoList, target]);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setTodo(value);
  };

  const handleChangeDoing = (doingItem: any) => {
    const newTodoList = todoList.filter((i: any) => i.id !== doingItem.id);
    setTodoList(newTodoList);
    setHasDoList([...hasDoList, doingItem]);
  };

  const handleChangeDone = (doneItem: any) => {
    const newHasDoList = hasDoList.filter((i: any) => i.id !== doneItem.id);
    setTodoList([...todoList, doneItem]);
    setHasDoList(newHasDoList);
  };

  const handleDel = (delItem: any, type: string) => {
    if (type === "todoList") {
      const newTodoList = todoList.filter((i: any) => i.id !== delItem.id);
      setTodoList(newTodoList);
    } else if (type === "hasDoList") {
      const newHasDoList = hasDoList.filter((i: any) => i.id !== delItem.id);
      setHasDoList(newHasDoList);
    }
  };

  return (
    <div className="todoList">
      <header className="header">
        <div className="logo">ToDoList</div>
        <div className="input">
          <Input
            value={todo}
            placeholder="添加ToDo"
            onChange={handleChange}
            onPressEnter={handlePressEnter}
          />
        </div>
      </header>
      <div className="title">
        <h3>正在进行</h3>
        <span className="totalCount">{todoList.length}</span>
      </div>
      <ul className="todoList">
        {todoList.map((item: any) => {
          return (
            <li key={item.id}>
              <Checkbox
                className="checkBox"
                onChange={() => handleChangeDoing(item)}
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
      <div className="title">
        <h3>已经完成</h3>
        <span className="totalCount">{hasDoList.length}</span>
      </div>
      <ul className="hasDoList">
        {hasDoList.map((item: any) => {
          return (
            <li key={item.id}>
              <Checkbox
                checked
                className="checkBox"
                onChange={() => handleChangeDone(item)}
              />
              <div className="detail">{item.value}</div>
              <DeleteOutlined
                className="del"
                onClick={() => handleDel(item, "hasDoList")}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
