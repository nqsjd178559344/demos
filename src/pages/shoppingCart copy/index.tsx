import React, { useEffect, useState } from "react";
import { InputNumber, Checkbox, Radio } from "antd";
import data from "./constant";
import { useSelections } from "ahooks";
import { CalcSign } from "../../constant";
import { getDigitRoundNumber } from "../../utils";
import ShopWrapper, { ShopItem } from "./components/Shop";
import { Item } from "./components/Item";
import "./index.less";
import classNames from "classnames";
interface Total {
  price: number;
  number: number;
}

const ShoppingCart = () => {
  const [total, setTotal] = useState<Total>({ price: 0, number: 0 });
  const newData = data.map((i: ShopItem) => {
    const newList = i.list.map((ii: Item) => ({
      ...ii,
      id: `${i.shopId}_${ii.id}`,
      number: 1,
      totalPrice: ii.price,
    }));
    return { ...i, list: newList };
  });
  const [list, setList] = useState<any>(newData);

  const {
    selected,
    isSelected,
    toggle,
    toggleAll,
    allSelected,
    noneSelected
  } = useSelections(list.map((i: ShopItem) => i.shopId));

  const handleSettle = () => {
    console.log("去结算啦");
  };

  useEffect(()=>{
    console.log(list,'list')
    calculateTotalPrice();
  },[list])

  const handleChangeData = ({...obj}:{shopId:string,list:Item}) => {
    const newList = list.map((i: ShopItem) => {
      if (i.shopId !== obj.shopId) {
        return i;
      } else {
        return {
          ...i,
          ...obj,
        };
      }
    });
    console.log(newList,'newList',obj)
    setList(newList)
  };

  const calculateTotalPrice = () => {
    console.log('总价',list)
    let newTotal:Total = list.reduce((pre: any, cur: any) => {
      pre.price = pre.price + (cur.totalShopPrice || 0)
      pre.number = pre.number + (cur.number || 0)
      return pre
    }, {
      price:0,
      number:0
    });
    newTotal.price = getDigitRoundNumber(newTotal.price, 2);
    setTotal(newTotal);
  };

  const handleChange = () => {
    toggleAll();
  };

  return (
    <>
      <ul className="ul">
        {list &&
          list.map((item: ShopItem) => {
            return (
              <ShopWrapper
                key={item.shopId}
                item={item}
                isSelected={isSelected}
                toggle={toggle}
                selected={selected}
                length={list.length}
                allSelected={allSelected}
                noneSelected={noneSelected}
                handleChangeData={handleChangeData}
              />
            );
          })}
      </ul>
      <div className="fixed-bottom">
        <Checkbox checked={allSelected}
         onChange={handleChange}
        >
          全选
        </Checkbox>
        <span className="total">已选择 <span className="red bold">{total.number}</span> 件商品</span>
        <span className="totalCountWrapper">
          <span className="m_r10"> 合计（不含运费）：</span>
          <span className="totalCount fontSize26">¥{total.price}</span>
        </span>
        <div onClick={handleSettle} className="settle">
          去结算
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
