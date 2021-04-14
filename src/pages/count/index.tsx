import React, { useEffect, useState } from "react";
import classNames from "classnames";
import data from "./constant";
import "./index.less";

interface Item{
  text:number | string,
  width?:number
}

const Calculator = () => {
  const [result, setResult] = useState(0);
  const initArr: number[] = [];
  const [arr, setArr] = useState(initArr);

  const handleChangeResult = (e: any) => {
    // 等于
    const { innerHTML } = e.target;
    const newArr = [...arr, innerHTML];
    let res: any = myCalculate(newArr);
    setResult(res);
    setArr([]);
  };

  /**
   * 思路:初始target:当前数组;stack:当前栈
   * 1. 遇见数字则位数累加存住（target）
   * 2. 遇见符号:
   *      1. +:stack push target
   *      2. -:stack push -1 * target
   *      3. *:stack push stack.pop * target
   *      4. /:stack push stack.pop / target
   *
   * @param arr
   * @returns 计算后返回值
   */
  const myCalculate = (arr: any) => {
    let stack: any = [],
      n = 0,
      sign = "+";
    for (let i = 0, j = arr.length; i < j; i++) {
      let target = arr[i];
      if (typeof target === "number") {
        n = 10 * n + target;
        continue;
      }

      if (sign === "+") {
        stack.push(n);
      } else if (sign === "-") {
        stack.push(-1 * n);
      } else if (sign === "*") {
        let pop = stack.pop();
        stack.push(pop * n);
      } else if (sign === "/") {
        let pop = stack.pop();
        stack.push(pop / n);
      }
      sign = target;
      n = 0;
    }

    return stack.reduce((pre: number, cur: number) => pre + cur, 0);
  };

  const handleChange = (e: any) => {
    // 额外操作
    const { innerHTML } = e.target;
    if (innerHTML === "Back") {
      // 回退1
      const newArr = arr.slice(0, arr.length - 1);
      setArr(newArr);
    } else if (innerHTML === "C") {
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
