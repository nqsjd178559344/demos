import React from "react";
import Selector,{ Item }  from "./components/Selector";
import Header from "./components/Header";
import Search from "./components/Search";
import Top from "./components/Top";
import { data } from "./constant";
import "./index.less";


const Home = () => {
  return (
    <>
      <Header/>
      <Search/>
      <Top/>
      <div className="selector-wrapper">
        <div className="selector_wrapper">
          <div className="selector_wrapper_list">
            {data &&
              data.map(
                (i: Item) => {
                  return <Selector key={i.id} item={i} {...i} />;
                }
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
