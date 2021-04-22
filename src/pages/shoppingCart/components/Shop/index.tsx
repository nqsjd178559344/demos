import React, { useEffect, useState } from "react";
import { InputNumber, Checkbox, Radio } from "antd";
import ItemWrapper, { Item } from "../Item";
import { useSelections } from "ahooks";
import { CalcSign } from "../../../../constant";
import { getDigitRoundNumber } from "../../../../utils";
import "./index.less";
import classNames from "classnames";

export interface ShopItem {
  shopId: string;
  shopName: string;
  shopAddress: string;
  shopOwner: string;
  shopOwnerIsOnline: boolean;
  shopChecked: boolean;
  shopTotalNumber: number;
  shopTotalPrice: number;
  list: Item[];
}

interface MyProps {
  item: ShopItem;
  length:number;
  isSelected: (shopId: string) => boolean;
  toggle: (shopId: string) => void;
  selected: any
  allSelected:boolean
}

const ShopItem = (props: MyProps) => {
  const [lastAllSelected,setLastAllSelected] = useState(false) // 单例模式
  const {
    item,
    length,
    isSelected: propsIsSelected,
    toggle: propsToggle,
    selected: propsSelected,
    allSelected:propsAllSelected
  } = props;

  const {
    isSelected,
    toggle,
    allSelected,
    selected,
    toggleAll
  } = useSelections(item.list.map((i: Item) => i.id));

  const handleChange = () => {
    propsToggle(item.shopId)
    toggleAll()
  };

  useEffect(()=>{ // 当上次全选 ！== 本次全选h ,则通知父级 
    if(lastAllSelected!== allSelected){
      propsToggle(item.shopId)
      setLastAllSelected(allSelected)
    }  
  },[allSelected])

  return (
    <li className="li" key={item.shopId}>
      <div className="shop">
        <div className="checkBox">
          <Checkbox checked={allSelected} 
          onChange={handleChange} 
          />
        </div>
        <div className="shopName m_r8 bold">{item.shopName}书屋</div>
        <div className="shopAddress m_r25 gray">{item.shopAddress}</div>
        <div className="shopOwner m_r8">{item.shopOwner}</div>
        <div
          className={classNames("shopOwnerIsOnline", {
            online: item.shopOwnerIsOnline,
            offline: !item.shopOwnerIsOnline,
          })}
        >
          {item.shopOwnerIsOnline ? "在线交谈" : "离线留言"}
        </div>
        <div
          className={classNames("shopTotalPrice red", {
            hidden: !item.shopTotalPrice,
          })}
        >
          本店小计：¥{item.shopTotalPrice}
        </div>
      </div>
      <div className="list">
        {item.list.map((i) => {
          return (
            <ItemWrapper
              key={i.id}
              i={i}
              shopId={item.shopId}
              isSelected={isSelected}
              toggle={toggle}
              propsToggle={propsToggle}
              length={item.list.length}
              selected={selected}
              allSelected={allSelected}
              
            />
          );
        })}
      </div>
    </li>
  );
};

export default ShopItem;
