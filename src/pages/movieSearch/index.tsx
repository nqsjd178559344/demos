import React, { useEffect, useState } from "react";
import BScroll from "better-scroll";
import axios from "axios";
import './index.less';
import Item, { IProps } from "./components/Item";
const MovieSearch = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios("https://www.omdbapi.com/?s=man&apikey=4a3b711b").then(
      ({ data: { Search } }) => {
        console.log(Search, "Search");
        setList(Search);
      }
    );
  }, []);

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
