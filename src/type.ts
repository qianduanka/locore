/*
 * @Author: qianduanka
 * @Date: 2024-03-10
 * @Description: 类型常用方法处理，判断是否为基本类型
 * @information：微信号 qianduanka
 */




/**
 * isPrimitive 判断是否为基本类型
 * @param {any} target 待判断基本类型的值
 * @returns {boolean} 返回布尔值，如果值是基本类型返回真，否则，返回假
 */
export const isPrimitive = function (target: any) {
    if (typeof target === 'object') {
        return target === null;
    }
    return typeof target !== 'function';
};


export const type = function (target: any) {
    return Object.prototype.toString
        .call(target)
        .slice(8, -1)
        .toLowerCase()
        .replace(/\s/g, '');
};