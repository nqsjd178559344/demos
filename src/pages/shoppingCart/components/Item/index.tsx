import React, { useEffect, useState } from "react";
import { InputNumber, Checkbox, Radio } from "antd";
import { useSelections } from "ahooks";
import { CalcSign } from "../../../../constant";
import { getDigitRoundNumber } from "../../../../utils";
import "./index.less";
import classNames from "classnames";
export interface Item {
  id: string;
  name: string;
  author: string[];
  introduction: string;
  price: number;
  max: number;
  backgroundImage: string;
  backgroundColor: string;
  number: number;
  checked: boolean;
  totalPrice: number;
}

interface MyProps {
  i: Item;
  shopId: string;
  length:number;
  isSelected: (shopId: string) => boolean;
  toggle: (shopId: string) => void;
  propsToggle: (shopId: string) => void;
  selected: string[]
  allSelected:boolean
}

const Item = (props: MyProps) => {
  const {
    i,
    shopId,
    length,
    isSelected: propsIsSelected,
    toggle: propsToggle,
    propsToggle:shopPropsToggle,
    selected: propsSelected,
    allSelected:propsAllSelected
  } = props;

  const handleChange = () => {
    propsToggle(i.id)
  };

  return (
    <div className="list_item" key={i.id}>
      <div className="checkBox">
        <Checkbox
          checked={propsIsSelected(i.id)}
          onChange={handleChange}
        />
      </div>
      <img style={{ margin: "0 20px" }} src={i.backgroundImage} alt={i.name} />
      <div className="right">
        <h3>{i.name}</h3>
        <span className="price">{i.price}</span>
        <div className="inputNumber_wrapper">
          <div className="inputNumber_wrapper_item">
            <span
              className={classNames("subtract", {
                unClick: i.number === 1,
              })}
            >
              -
            </span>
            <input
              className="inputNumber"
              type="text"
              min={1}
              max={i.max}
              defaultValue={1}
              value={i.number}
              id={i.id}
            />
            <span
              className={classNames("add", {
                unClick: i.number === i.max,
              })}
            >
              +
            </span>
          </div>
          <span
            className={classNames("kuCun_num", {
              hidden: i.number !== i.max,
            })}
          >
            库存仅剩{i.number}件
          </span>
        </div>
        <span className="totalPrice">{i.totalPrice}</span>
        <span className="moveTo_favorite">移入收藏</span>
        {/* <span className="del" onClick={() => handleDel(i.id, shopId)}>
          删除
        </span> */}
      </div>
    </div>
  );
};

export default Item;
