import React, { useEffect, useState } from "react";
import classNames from "classnames";
import data from "./constant";
import {CalcSign} from "../../constant";
import {calculate} from './utils'
import "./index.less";

interface Item{
  text:number | string,
  width?:number
}

const Calculator = () => {
  const [result, setResult] = useState(0);
  const [arr, setArr] = useState<number[]>([]);

  const handleChangeResult = (e: any) => {
    // 等于
    const { innerHTML } = e.target;
    const newArr = [...arr, innerHTML];
    let res: any = calculate(newArr);
    setResult(res);
    setArr([]);
  };

  const handleChange = (e: any) => {
    // 额外操作
    const { innerHTML } = e.target;
    if (innerHTML === CalcSign.Back) {
      // 回退1
      const newArr = arr.slice(0, arr.length - 1);
      setArr(newArr);
    } else if (innerHTML === CalcSign.C) {
      // 清空
      setArr([]);
    } else {
      const newArr = [...arr, innerHTML];
      setArr(newArr);
    }
  };

  const handleChangeValue = (e: any) => {
    // 更改值
    const { innerHTML } = e.target;
    const newArr: number[] = [...arr, Number(innerHTML)];
    setArr(newArr);
  };

  return (
    <div className="calculator">
      <div className="show">
        <div className="top">{arr}</div>
        <div className="bottom">{result}</div>
      </div>
      <div className="input">
        {data &&
          data.map((i) => {
            return (
              <div className="item_row">
                {i &&
                  i.map((ii:Item) => {
                    return (
                      <div
                        key={ii.text}
                        className={classNames("item", {
                          [`item_${ii.width}`]: ii.width,
                        })}
                        onClick={
                          ii.width
                            ? handleChangeResult
                            : typeof ii.text === "string"
                            ? handleChange
                            : handleChangeValue
                        }
                      >
                        {ii.text}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Calculator;
