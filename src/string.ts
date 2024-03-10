/*
 * @Author: qianduanka
 * @Date: 2024-03-10
 * @Description: 字符串常用方法处理，插入、删除
 * @information：微信号 qianduanka
 */

export const delString = function (
    str: string = '',
    start: number = 0,
    deleteCount: number = str.length
) {
    deleteCount = Number(deleteCount);
    deleteCount = Math.floor(deleteCount);
    if (deleteCount <= 0) {
        deleteCount = 0;
        return str;
    }

    start = Number(start);
    start = Math.floor(start);

    if (Math.abs(start) >= str.length) {
        return str;
    }

    if (start < 0) {
        start = start + str.length;
    }

    let strPrev = str.slice(0, start);
    let strNext = str.slice(start + deleteCount, str.length);

    return strPrev + strNext;
};

export const insertString = (str: string = '', start: number = str.length, ...args: string[]) => {
    start = Number(start);
    start = Math.floor(start);

    let strOthers = args.reduce((prev, item) => {
        prev += String(item);
        return prev;
    }, '');

    if (Math.abs(start) >= str.length) {
        return start >= 0 ? str + strOthers : strOthers + str;
    }

    if (start < 0) {
        start = start + str.length;
    }

    let strPrev = str.slice(0, start);
    let strNext = str.slice(start, str.length);

    return strPrev + strOthers + strNext;
}