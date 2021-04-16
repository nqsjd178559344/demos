import React, { useEffect, useState } from "react";
import { InputNumber, Checkbox } from "antd";
import data from "./constant";
import "./index.less";

console.log(data, "data");

interface Item {
  id: string;
  name: string;
  author: string[];
  introduction: string;
  price: number;
  max: number;
  backgroundImage: string;
  backgroundColor: string;
}

const ShoppingCart = () => {
  return (
    <ul className='ul'>
      {data &&
        data.map((i: Item) => {
          return (
            <li key={i.id} style={{ backgroundColor: i.backgroundColor }}>
              <Checkbox />
              {/* <div className="left"> */}
              <img src={i.backgroundImage} alt={i.name} />
              {/* </div> */}
              <div className="right">
                <h3>{i.name}</h3>
                <span>{i.author}</span>
                <p dangerouslySetInnerHTML={{ __html: i.introduction }}></p>
                <div className="bottom">
                  <span className="price">￥ {i.price}</span>
                  <InputNumber min={1} max={i.max} defaultValue={1} />
                </div>
              </div>
            </li>
          );
        })}
        <div className="fixed-bottom">

        </div>
    </ul>
  );
};

export default ShoppingCart;
