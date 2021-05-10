import React, { useEffect, useState, useReducer } from "react";
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

  const { list } = state;

  return (
    <div className="movieSearchWrapper">
      <ul className="movieSearch" style={{ width: `${210 * list.length}px` }}>
        {list.map((i: IProps) => {
          return <Item key={i.imdbID} {...i} />;
        })}
      </ul>
    </div>
  );
};

export default MovieSearch;
