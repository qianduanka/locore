/*
 * @Author: qianduanka
 * @Date: 2024-03-10
 * @Description: 函数常用方法处理，防抖、节流
 * @information：微信号 qianduanka
 */


/**
 * debounce 防抖
 * 防抖是指在指定的一段时间间隔内，如果多次触发该函数，则仅触发最后一次函数运行
 * @param {function} func
 * @param {number} wait
 * @returns function
 */
export const debounce = function (func = () => { }, wait = 10) {
  let timer: any = null;
  return function (this: any, ...args: any) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

/**
 * throttle 节流
 * @param {function} func
 * @param {number} wait
 * @param {*} options
 * @returns
 */
export const throttle = function (func: any, wait = 10, options: any = {}) {
  Object.assign(options, { leading: true, trailing: true });
  let isFirst = options.leading;
  let timer: any = null;
  let lastTime = new Date().getTime();
  return function (this: any, ...args: any) {
    if (isFirst) {
      isFirst = false;
      timer && clearTimeout(timer);
      func.apply(this, args);
    }
    const now = new Date().getTime();
    if (now - lastTime >= wait) {
      lastTime = now;
      func.apply(this, args);
    } else {
      if (!timer && options.trailing) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
          timer = null;
          lastTime = new Date().getTime();
        }, wait);
      }
    }
  };
};
