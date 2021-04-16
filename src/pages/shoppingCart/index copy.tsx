import React, { useEffect, useState } from "react";
import { InputNumber, Checkbox, Radio } from "antd";
import data from "./constant";
import "./index.less";
import classNames from "classnames";

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
  const [hasChooseNum, setHasChooseNum] = useState(0);
  const handleSettle = () => {
    console.log("去结算啦");
  };

  return (
    <ul className="ul">
      {data &&
        data.map((i: Item) => {
          return (
            <li key={i.id} style={{ backgroundColor: i.backgroundColor }}>
              <Checkbox />
              <img src={i.backgroundImage} alt={i.name} />
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
        <Checkbox>全选</Checkbox>
        <span className="total">已选择 {1} 件商品</span>
        <span className="totalCountWrapper">
          <span className="fontSize18"> 总价 ￥</span>
          <span className="totalCount fontSize26">{200}</span>
          <span className="fontSize26">.</span>
          <span className="totalCountFixed fontSize20">00</span>
        </span>
        <div
          onClick={handleSettle}
          style={
            hasChooseNum
              ? {
                  backgroundColor: "#FDB400",
                  color: "#FFF",
                }
              : {
                  backgroundColor: "#EAEAEA",
                  color: "#1A1A1A",
                }
          }
          className="settle"
        >
          去结算
        </div>
      </div>
    </ul>
  );
};

export default ShoppingCart;
