import React, { useEffect, useState } from "react";
import { InputNumber, Checkbox, Radio } from "antd";
import ItemWrapper, { Item } from "../Item";
import { useSelections } from "ahooks";
import { CalcSign } from "../../../../constant";
import { getDigitRoundNumber } from "../../../../utils";
import "./index.less";
import classNames from "classnames";
interface ShopTotal {
  totalShopPrice: number;
}
export interface ShopItem {
  shopId: string;
  shopName: string;
  shopAddress: string;
  shopOwner: string;
  shopOwnerIsOnline: boolean;
  shopChecked: boolean;
  shopTotalNumber: number;
  shopTotalPrice: number;
  totalShopPrice:number;
  list: Item[];
}

interface MyProps {
  item: ShopItem;
  length: number;
  isSelected: (shopId: string) => boolean;
  toggle: (shopId: string) => void;
  selected: any;
  allSelected: boolean;
  noneSelected: boolean;
  handleChangeData: any;
}

const ShopItem = (props: MyProps) => {
  const {
    item,
    length,
    isSelected: propsIsSelected,
    toggle: propsToggle,
    selected: propsSelected,
    allSelected: propsAllSelected,
    noneSelected: propsNoneSelected,
    handleChangeData: propsHandleChangeData,
  } = props;

  const initItemList = item.list.map((i: Item) => i.id);

  const {
    isSelected,
    toggle,
    allSelected,
    noneSelected,
    selected,
    selectAll,
    unSelectAll,
    setSelected,
  } = useSelections(initItemList);

  useEffect(() => {
    if(propsAllSelected){
      selectAll();
    }
  }, [propsAllSelected]);

  useEffect(() => {
    if(propsNoneSelected ){
      unSelectAll();
    }
  }, [propsNoneSelected]);

   useEffect(() => {
    if((allSelected && !propsIsSelected(item.shopId)) || (!allSelected && propsAllSelected)){
      propsToggle(item.shopId)
    }
  }, [allSelected]);

  useEffect(() => {
    if(noneSelected && propsIsSelected(item.shopId)){
      propsToggle(item.shopId)
    }
  }, [noneSelected]);

  const handleChange = () => {
    const newSelected = !allSelected ? initItemList : [];
    const totalShopPrice = newSelected.length ? calculateTotalPrice(newSelected) : 0
    propsHandleChangeData({
      shopId:item.shopId,
      totalShopPrice,
    });
    setSelected(newSelected);
    propsToggle(item.shopId);

  };

  const calculateTotalPrice = (newSelected:string[])=>{
    const totalShopPrice = item.list.reduce(
      (pre: number, cur: any) => {
        if (newSelected.includes(cur.id)) {
          pre += cur.totalPrice;
        }
        return pre;
      },
      0
    );

    return getDigitRoundNumber(totalShopPrice, 2);
  }

  return (
    <li className="li" key={item.shopId}>
      <div className="shop">
        <div className="checkBox">
          <Checkbox checked={allSelected} onChange={handleChange} />
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
            hidden: !item.totalShopPrice,
          })}
        >
          本店小计：¥{item.totalShopPrice}
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
              handleChangeData={propsHandleChangeData}
            />
          );
        })}
      </div>
    </li>
  );
};

export default ShopItem;
