import React, { useState } from "react";
import { Input } from "antd";
import List from "./components/list";
import "./index.less";

const TodoList = () => {
  const [id, setId] = useState(0);
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<any>([]);
  const [hasDoList, setHasDoList] = useState<any>([]);
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
      <List
        title="正在进行"
        todoList={todoList}
        handleChange={handleChangeDoing}
        handleDel={handleDel}
      />
      <List
        title="已经完成"
        todoList={hasDoList}
        handleChange={handleChangeDone}
        handleDel={handleDel}
      />
    </div>
  );
};

export default TodoList;
