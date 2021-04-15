 import {CalcSign} from './constant'
 
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
  export const calculate = (arr: any) => {
    let stack: any = [],
      n = 0,
      sign = CalcSign.Add;
    for (let i = 0, j = arr.length; i < j; i++) {
      let target = arr[i];
      if (typeof target === "number") {
        n = 10 * n + target;
        continue;
      }

      if (sign === CalcSign.Add) {
        stack.push(n);
      } else if (sign === CalcSign.Subtract) {
        stack.push(-1 * n);
      } else if (sign === CalcSign.Multiply) {
        let pop = stack.pop();
        stack.push(pop * n);
      } else if (sign === CalcSign.Divide) {
        let pop = stack.pop();
        stack.push(pop / n);
      }
      sign = target;
      n = 0;
    }

    return stack.reduce((pre: number, cur: number) => pre + cur, 0);
  };