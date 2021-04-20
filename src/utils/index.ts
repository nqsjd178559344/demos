/**
 * 四舍五入
 * num 数字
 * digit 位数
 */
 export const getDigitRoundNumber = (num:number, digit:number) => {
    return Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit)
  }

/**
 * 向上取整
 * num 数字
 * digit 位数
 */
 export const getDigitCeilNumber = (num:number, digit:number) => {
    return Math.ceil(num * Math.pow(10, digit)) / Math.pow(10, digit)
  }