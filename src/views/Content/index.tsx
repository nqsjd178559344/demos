import React, { useEffect, useState } from "react";
import axios from "axios";
import Selector,{Item} from "../../components/Selector";
import data from "./data";
import "./index.less";


const Content = () => {
  return (
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
  );
};

export default Content;
