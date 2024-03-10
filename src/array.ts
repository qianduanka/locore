/*
 * @Author: qianduanka
 * @Date: 2024-03-10
 * @Description: 数组常用方法处理，排序、最大值、最小值、去重
 * @information：微信号 qianduanka
 */


/**
 * sort 数组排序
 * 数组排序是指数组中的元素按照升序或降序方式排列
 * @param { array } arr 待排序的数组
 * @param { array | undefined }args 排序规则 ['ASC'|'DESC'，callback，'LOCALE'] 如：['ASC', obj => obj.name, 'LOCALE']，默认基本类型升序
 * @returns { array } 排序后的数组
 */
export const sort = function (
    arr: (number | bigint | string | object)[] = [],
    ...args: any[]
) {
    if (!Array.isArray(arr)) {
        throw TypeError('请传入数组, 现在传入的是' + typeof arr);
    }
    if (arr.length <= 1) {
        return arr;
    }
    if (args.length === 0) {
        args = ['ASC'];
    }
    return arr.sort((a, b): number => {
        for (let arg of args) {
            let func = (fa: any, fb: any): number => {
                let tmpA = fa;
                let tmpB = fb;
                if (typeof arg[1] === 'function') {
                    tmpA = arg[1](fa);
                    tmpB = arg[1](fb);
                }
                if (arg[2] === 'LOCALE') {
                    if (arg[0] === 'DESC') {
                        return String(tmpB).localeCompare(String(tmpA));
                    } else {
                        return String(tmpA).localeCompare(String(tmpB));
                    }
                }

                if (tmpA == tmpB) {
                    return 0;
                }

                if (arg[0] === 'DESC') {
                    return tmpB > tmpA ? 1 : -1;
                } else {
                    return tmpA > tmpB ? 1 : -1;
                }
            };
            let res = func(a, b);
            if (res != 0) {
                return res;
            }
        }
        return 0;
    });
};

/**
 * max 数组最大元素
 * 数组最大元素是指获取数组中元素的最大的值或者数组中对象的某个的属性的最大元素
 * @param { array } arr 待查找的数组 
 * @param { function | undefined } callback 
 * @returns { number | object | undefined } 返回查找到的最大元素，如果不存在返回undefined
 */
export const max = (arr: any[] = [], callback?: Function): (number | object | undefined) => {
    if (!Array.isArray(arr)) {
        throw TypeError('请传入数组, 现在传入的是' + typeof arr);
    }

    if (!arr.length) {
        return undefined;
    }

    if (typeof callback !== 'function') {
        return Math.max(...arr);
    } else {
        let numArr: number[] = arr.map((item, index) => callback(item, index, arr));
        let max: number = numArr[0];
        let index: number = 0;
        for (let i = 1; i < numArr.length; i++) {
            if (max < numArr[i]) {
                max = numArr[i];
                index = i;
            }
        }
        return arr[index];
    }
}

/**
 * min 数组最小元素
 * 数组最小元素是指获取数组中元素的最小的值或者数组中对象的某个的属性的最小元素
 * @param { array } arr 待查找的数组 
 * @param { function | undefined } callback 
 * @returns { number | object | undefined } 返回查找到的最小元素，如果不存在返回undefined
 */
export const min = (arr: any[] = [], callback?: Function): (number | object | undefined) => {
    if (!Array.isArray(arr)) {
        throw TypeError('请传入数组, 现在传入的是' + typeof arr);
    }

    if (!arr.length) {
        return undefined;
    }

    if (typeof callback !== 'function') {
        return Math.min(...arr);
    } else {
        let numArr: number[] = arr.map((item, index) => callback(item, index, arr));
        let min: number = numArr[0];
        let index: number = 0;
        for (let i = 1; i < numArr.length; i++) {
            if (min > numArr[i]) {
                min = numArr[i];
                index = i;
            }
        }
        return arr[index];
    }
}

/**
 * unique 数组去重
 * 数组去重`uniqueArray`是指将多个相同的元素仅保留一个元素，并返回去重后的新数组
 * @param { array } arr 
 * @returns { array } 返回去重后的数组
 */
export const unique = (arr = []) => {
    return [...new Set(arr)];
};