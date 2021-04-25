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
  length: number;
  isSelected: (shopId: string) => boolean;
  toggle: (shopId: string) => void;
  propsToggle: (shopId: string) => void;
  selected: string[];
  allSelected: boolean;
  handleChangeData: any;
}

const Item = (props: MyProps) => {
  const {
    i,
    shopId,
    length,
    isSelected: propsIsSelected,
    toggle: propsToggle,
    propsToggle: shopPropsToggle,
    selected: propsSelected,
    allSelected: propsAllSelected,
    handleChangeData,
  } = props;

  const handleChangeInputNumber = (i: Item, type: string) => {
    const { number, id } = i;
    let newNumber =
      type === CalcSign.Add
        ? number + 1
        : type === CalcSign.Subtract
        ? number - 1
        : number;
    let newTotalPrice = getDigitRoundNumber(i.price * newNumber, 2);
    handleChangeData({
      shopId,
      id,
      number: newNumber,
      totalPrice: newTotalPrice,
      shopSelected: propsSelected,
    });
  };

  const handleDel = (id: string, shopId: String) => {};

  /**
   * @description 点击某条时Shop的 selected 存入此值
   * !bug: 已经全选后，先取消其中某条，再点击全选，则当前未全选，而是全部取消;
   */
  const handleChange = () => {
    const { number, totalPrice, id } = i;
    let shopSelected = [];
    if (propsSelected.includes(id)) {

      shopSelected = propsSelected.filter((ii: any) => ii !== id);
    } else {
      shopSelected = [...propsSelected, id];
    }
    handleChangeData({
      shopId,
      id,
      number: number,
      totalPrice: totalPrice,
      shopSelected,
    });
    propsToggle(i.id);
  };

  return (
    <div className="list_item" key={i.id}>
      <div className="checkBox">
        <Checkbox checked={propsIsSelected(i.id)} onChange={handleChange} />
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
              onClick={() =>
                i.number !== 1 && handleChangeInputNumber(i, CalcSign.Subtract)
              }
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
              onClick={() =>
                i.number !== i.max && handleChangeInputNumber(i, CalcSign.Add)
              }
            >
              +
            </span>
          </div>
          <span
            className={classNames("kuCun_num", {
              hidden: i.number !== i.max,
            })}
          >
            库存仅剩{i.max}件
          </span>
        </div>
        <span className="totalPrice">{i.totalPrice}</span>
        <span className="moveTo_favorite">移入收藏</span>
        <span className="del" onClick={() => handleDel(i.id, shopId)}>
          删除
        </span>
      </div>
    </div>
  );
};

export default Item;
