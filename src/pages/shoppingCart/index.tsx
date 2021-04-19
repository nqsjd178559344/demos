import React, { useEffect, useState } from "react";
import { InputNumber, Checkbox, Radio } from "antd";
import data from "./constant";
import { CalcSign } from "../../constant";
import { getDigitRoundNumber } from "../../utils";
import "./index.less";
import classNames from "classnames";

interface Item {
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

interface ShopItem {
  shopId: string;
  shopName: string;
  shopAddress: string;
  shopOwner: string;
  shopOwnerIsOnline: boolean;
  shopChecked: boolean;
  shopTotalNumber:number,
  shopTotalPrice: number;
  list: Item[];
}

interface Total {
  price:number;
  number:number
}

const ShoppingCart = () => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [total, setTotal] = useState<Total>({price:0,number:0});
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
  const handleSettle = () => {
    console.log("去结算啦");
  };

  const handleChangeInputNumber = (id: string, type: string) => {
    const newList = list.map((i: ShopItem) => {
      const newListItem = i.list.map((ii: Item) => {
        if (id !== ii.id) {
          return ii;
        }
        if (type === CalcSign.Add) {
          ii.number = ii.number + 1;
          ii.totalPrice = getDigitRoundNumber(ii.price * ii.number, 2);
        } else if (type === CalcSign.Subtract) {
          if (ii.number > 1) {
            ii.number = ii.number - 1;
            ii.totalPrice = getDigitRoundNumber(ii.price * ii.number, 2);
          }
        }
        return ii;
      });
      return { ...i, list: newListItem };
    });
    calculateTotalPrice(newList);
  };

  const onShopCheckboxChange = (shopId: string) => {
    const newList = list.map((i: ShopItem) => {
      if (shopId !== i.shopId) {
        return i;
      }
      const newListItem = i.list.map((ii) => ({
        ...ii,
        checked: !i.shopChecked,
      }));
      return { ...i, shopChecked: !i.shopChecked, list: newListItem };
    });
    calculateTotalPrice(newList);
  };

  const onCheckboxChange = (id: string, shopId: String) => {
    const newList = list.map((i: ShopItem) => {
      if (i.shopId !== shopId) {
        return i;
      }
      const newListItem = i.list.map((ii: Item) => {
        if (ii.id !== id) {
          return ii;
        }
        return { ...ii, checked: !ii.checked };
      });
      const hasAllChecked = newListItem.every((ii) => ii.checked);
      return {
        ...i,
        shopChecked: hasAllChecked,
        list: newListItem,
      };
    });
    calculateTotalPrice(newList);
  };

  const handleSelectAll = ()=>{
    const newList = list.map((i: ShopItem) => {
      const newListItem = i.list.map((ii: Item) => {
        return { ...ii, checked: !selectAll };
      });
      return {...i,shopChecked:!selectAll,list:newListItem}
    });
    calculateTotalPrice(newList);
    setSelectAll(!selectAll)
  }

  const calculateTotalPrice = (initList: any) => {
    // 计算总价
    const newList = initList.map((ii: ShopItem) => {
      const total = ii.list.reduce((pre: any, cur: Item) => {
        pre.shopTotalPrice =  cur.checked ? pre.shopTotalPrice + cur.totalPrice : pre.shopTotalPrice
        pre.shopTotalNumber =  cur.checked ? pre.shopTotalNumber + cur.number :pre.shopTotalNumber
        return pre;
      }, {
        shopTotalPrice:0,
        shopTotalNumber:0
      });

      total.shopTotalPrice = getDigitRoundNumber(total.shopTotalPrice, 2);
      return { ...ii, ...total };
    });
    const newTotal:Total = newList.reduce((pre:any,cur:ShopItem)=>{
      pre.price += cur.shopTotalPrice
      pre.number += cur.shopTotalNumber
      return pre
    },{
      price:0,
      number:0
    })
    newTotal.price = getDigitRoundNumber(newTotal.price, 2);
    setTotal(newTotal)
    setList(newList);
  };

  const handleDel = (id: string, shopId: String) => {
    const newList = list.map((i: ShopItem) => {
      if (i.shopId !== shopId) {
        return i;
      }
      const newListItem = i.list.filter((ii: Item) => ii.id !== id);
      return { ...i, list: newListItem };
    });
    setList(newList);
  };

  return (
    <ul className="ul">
      {list &&
        list.map((item: ShopItem) => {
          return (
            <li key={item.shopId}>
              <div className="shop">
                <div className="checkBox">
                  <Checkbox
                    checked={item.shopChecked}
                    onChange={() => onShopCheckboxChange(item.shopId)}
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
                <div className={classNames("shopTotalPrice red",{
                  "hidden":!item.shopTotalPrice
                })}>
                  本店小计：¥{item.shopTotalPrice}
                </div>
              </div>
              <div className="list">
                {item.list.map((i) => {
                  return (
                    <div className="list_item" key={i.id}>
                      <div className="checkBox">
                        <Checkbox
                          checked={i.checked}
                          onChange={() => onCheckboxChange(i.id, item.shopId)}
                        />
                      </div>
                      <img
                        style={{ margin: "0 20px" }}
                        src={i.backgroundImage}
                        alt={i.name}
                      />
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
                                i.number !== 1 &&
                                handleChangeInputNumber(i.id, CalcSign.Subtract)
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
                                i.number !== i.max &&
                                handleChangeInputNumber(i.id, CalcSign.Add)
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
                            库存仅剩{i.number}件
                          </span>
                        </div>
                        <span className="totalPrice">{i.totalPrice}</span>
                        <span className="moveTo_favorite">移入收藏</span>
                        <span
                          className="del"
                          onClick={() => handleDel(i.id, item.shopId)}
                        >
                          删除
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      <div className="fixed-bottom">
        <Checkbox checked={selectAll} onChange={handleSelectAll}>
          全选
        </Checkbox>
        <span className="total">已选择 {total.number} 件商品</span>
        <span className="totalCountWrapper">
          <span className="m_r10"> 合计（不含运费）：</span>
          <span className="totalCount fontSize26">¥{total.price}</span>
          {/* <span className="fontSize26">.</span>
          <span className="totalCountFixed fontSize20">00</span> */}
        </span>
        <div onClick={handleSettle} className="settle">
          去结算
        </div>
      </div>
    </ul>
  );
};

export default ShoppingCart;
