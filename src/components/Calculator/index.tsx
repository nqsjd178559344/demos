import React, { useEffect, useState } from "react";
import classNames from "classnames";
import data from "./data";
import "./index.less";

const Calculator = () => {
  const [result, setResult] = useState(0);
  const initArr: string[] | number[] = [];
  const [arr, setArr] = useState(initArr);

  const handleChangeResult = () => {
    // 等于
    // let res:any = arr.join("").split(/(\D)/);
    // let res1 = calculate(res);
    // console.log(arr, "handleChangeResult", res);

    let res1 = calculate(arr.join(""));
    console.log(res1, "res",arr);
    setArr([]);
  };

  const calculate = (s: string) => {
    for(let i = 0 ; i < s.length ; i ++){
      const char = s.charAt(i)

    }
  };

  const handleChange = (e: any) => {
    // 额外操作
    const { innerHTML } = e.target;
    console.log(innerHTML, "innerHTML");
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
    const newArr = [...arr, innerHTML];
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
                  i.map((ii) => {
                    return (
                      <div
                        className={classNames("item", {
                          width: ii.width,
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
