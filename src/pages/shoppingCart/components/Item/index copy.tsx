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

  const [number, setNumber] = useState<number>(i.number);
  const [totalPrice, setTotalPrice] = useState<number>(i.totalPrice);

  const handleChangeInputNumber = (id: string, type: string) => {
    let newNumber = type === CalcSign.Add ? number + 1 :type === CalcSign.Subtract ? number - 1 : number;
    let newTotalPrice = getDigitRoundNumber(i.price * newNumber, 2);
    handleChangeData({id, number:newNumber, totalPrice:newTotalPrice });
    setNumber(newNumber);
    setTotalPrice(newTotalPrice);
  };

  const handleDel = (id: string, shopId: String) => {};

  /**
   * @description 点击某条时Shop的 selected 存入此值
   */
  const handleChange = () => {
    propsToggle(i.id)
    handleChangeData({id:i.id, number, totalPrice });
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
                unClick: number === 1,
              })}
              onClick={() =>
                number !== 1 && handleChangeInputNumber(i.id, CalcSign.Subtract)
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
              value={number}
              id={i.id}
            />
            <span
              className={classNames("add", {
                unClick: number === i.max,
              })}
              onClick={() =>
                number !== i.max && handleChangeInputNumber(i.id, CalcSign.Add)
              }
            >
              +
            </span>
          </div>
          <span
            className={classNames("kuCun_num", {
              hidden: number !== i.max,
            })}
          >
            库存仅剩{i.max}件
          </span>
        </div>
        <span className="totalPrice">{totalPrice}</span>
        <span className="moveTo_favorite">移入收藏</span>
        <span className="del" onClick={() => handleDel(i.id, shopId)}>
          删除
        </span>
      </div>
    </div>
  );
};

export default Item;
