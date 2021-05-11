import React, { useEffect, useState, useReducer, useRef } from "react";
import BScroll from "better-scroll";
import axios from "axios";
import "./index.less";
import Item, { IProps } from "./components/Item";

interface State {
  loading: boolean;
  list: any[];
}

interface Action {
  type: string;
  list?: any;
}

const initState = {
  loading: true,
  list: [],
};
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        list: action.list,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
const MovieSearch = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const refWrapper = useRef<any>(null);
  useEffect(() => {
    axios("https://www.omdbapi.com/?s=man&apikey=4a3b711b").then(
      ({ data: { Search, Response } }) => {
        if (Response === "True") {
          dispatch({
            type: "SUCCESS",
            list: Search,
          });
        } else {
          dispatch({
            type: "ERROR",
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    const scroll = new BScroll(refWrapper.current, {
      scrollX: true, //开启横向滚动
      click: true, // better-scroll 默认会阻止浏览器的原生 click 事件
      scrollY: false, //关闭竖向滚动
    });
  }, [state.list]);

  const { list } = state;

  return (
    <div className="movieSearchWrapper" ref={refWrapper}>
      <ul className="movieSearch" style={{ width: `${340 * list.length}px` }}>
        {list.map((i: IProps) => {
          return <Item key={i.imdbID} {...i} />;
        })}
      </ul>
    </div>
  );
};

export default MovieSearch;
