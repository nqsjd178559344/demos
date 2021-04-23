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
    handleChangeData: propsHandleChangeData,
  } = props;

  const initItemList = item.list.map((i: Item) => i.id);

  const {
    isSelected,
    toggle,
    allSelected,
    selected,
    toggleAll,
    setSelected,
  } = useSelections(initItemList);

  const [totalShopPrice, setTotalShopPrice] = useState<number>(0);
  const [itemList, setItemList] = useState<Item[]>(item.list);
  const [lastAllSelected, setLastAllSelected] = useState(false); // 单例模式

  /**
   * @description 父级onChange触发说当前项不可选择,则取消自己及子集所有已选元素; 如父级为子集被动触发，则不变
   */
  useEffect(() => {
    const value = propsIsSelected(item.shopId);
    console.log(value, "传递", value ? initItemList : []);
    if (value) {
      setSelected(initItemList);
    } else {
      // setSelected([]);
    }
    setLastAllSelected(value);
  }, [propsIsSelected(item.shopId)]);

  /**
   * @description 当 allSelected 第一次存在时,通知父级 selected 存入此值; 当 allSelected 第一次不存在时,通知父级 selected 删除此值;
   */
  useEffect(() => {
    if (allSelected !== lastAllSelected) {
      propsToggle(item.shopId)
      setLastAllSelected(allSelected);
      console.log(allSelected, "propsSelected", propsSelected);
    }
  }, [allSelected]);

  /**
   * @description 通知父级 selected 存入||删除此值
   */
  const handleChange = () => {
    propsToggle(item.shopId);
    toggleAll();
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

  const calculateTotalShopPrice = (newItemList: Item[]) => {
    let tmp = newItemList.reduce(
      (pre: any, cur: Item) => {
        const hasSelectedId = isSelected(cur.id);
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
