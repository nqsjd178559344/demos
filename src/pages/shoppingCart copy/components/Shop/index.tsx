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

  const [totalShopPrice, setTotalShopPrice] = useState<number>(0);
  const [itemList, setItemList] = useState<Item[]>(item.list);
  const [lastAllSelected, setLastAllSelected] = useState(false); // 单例模式

  useEffect(() => {
    if(propsAllSelected){
      selectAll();
    }
    if(propsAllSelected){
      const { totalShopPrice, number } = calculateTotalShopPrice(itemList,true);
      propsHandleChangeData({
        shopId: item.shopId,
        list: itemList,
        totalShopPrice,
        number,
      });
    }else{

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
    if(noneSelected){

    }
  }, [noneSelected]);

  const handleChange = () => {
    if(!allSelected){
      console.log('全选')
      const { totalShopPrice, number } = calculateTotalShopPrice(itemList,!allSelected);
      propsHandleChangeData({
        shopId: item.shopId,
        list: itemList,
        totalShopPrice,
        number,
      });
      console.log(itemList,'newItemList',!allSelected,totalShopPrice,'totalShopPrice',number)
    }else{
      console.log('反选')
      propsHandleChangeData({
        shopId: item.shopId,
        list: itemList,
        totalShopPrice:0,
        number:0,
      });
      setTotalShopPrice(0)
    }
    const newSelected = !allSelected ? initItemList : [];
    setSelected(newSelected);
    propsToggle(item.shopId);

  };

  const handleChangeData = ({
    ...obj
  }: {
    id: string;
    number: number;
    totalPrice: number;
  }) => {
    // 子集改变Item
    const newItemList = item.list.map((i: Item) => {
      if (i.id !== obj.id) {
        return i;
      } else {
        return {
          ...i,
          ...obj,
        };
      }
    });
    const { totalShopPrice, number } = calculateTotalShopPrice(newItemList);
    propsHandleChangeData({
      shopId: item.shopId,
      list: newItemList,
      totalShopPrice,
      number,
    });
    setItemList(newItemList);
  };

  const calculateTotalShopPrice = (newItemList: Item[],bool = false) => {
    let tmp = newItemList.reduce(
      (pre: any, cur: Item) => {
        const hasSelectedId = isSelected(cur.id) || bool;
        pre.totalShopPrice =
          pre.totalShopPrice + (hasSelectedId ? cur.totalPrice : 0);
        pre.number = pre.number + (hasSelectedId ? cur.number : 0);
        return pre;
      },
      {
        totalShopPrice: 0,
        number: 0,
      }
    );
    tmp.totalShopPrice = getDigitRoundNumber(tmp.totalShopPrice, 2);
    setTotalShopPrice(tmp.totalShopPrice);
    return tmp;
  };

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
            hidden: !totalShopPrice,
          })}
        >
          本店小计：¥{totalShopPrice}
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
              handleChangeData={handleChangeData}
            />
          );
        })}
      </div>
    </li>
  );
};

export default ShopItem;
