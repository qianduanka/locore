/*
 * @Author: qianduanka
 * @Date: 2024-03-10
 * @Description: 对象常用方法处理，深拷贝
 * @information：微信号 qianduanka
 */

interface KeyValObject {
    [key: (string | symbol)]: any
}

/**
 * deepClone 深拷贝
 * 深拷贝是指将源对象的键值对复制到拷贝对象上
 * @param {object} target 目标对象
 * @returns {object} 返回新对象
 */
export const deepClone = (target: (object | Array<any>)) => {
    return innerDeepCopy(target);
}

const innerDeepCopy = function (obj: (object | Array<any>), weakset: WeakSet<object> = new WeakSet()) {
    if (weakset.has(obj)) {
        return obj;
    }
    let result: KeyValObject = Array.isArray(obj) ? [] : {};
    if (typeof obj == 'object' && obj !== null) {
        weakset.add(obj);
        let keys = Reflect.ownKeys(obj);
        for (let i = 0; i < keys.length; i++) {
            if (Object.hasOwn(obj, keys[i])) {
                let objKey = obj[keys[i] as keyof typeof obj];
                if (typeof objKey === 'object' && objKey !== null) {
                    result[keys[i]] = innerDeepCopy(objKey, weakset);
                } else {
                    result[keys[i]] = objKey;
                }
            }
        }
    } else {
        result = obj;
    }
    return result;
};


/**
 * extend 扩展
 * 扩展将一个或多个目标对象的属性复制到目标对象
 * @param {object} target 源对象
 * @param  {args} sources 目标对象
 * @returns {object}  返回源对象
 */
export const extend = (target: KeyValObject, ...sources: (object[])) => {
    for (let i = 0; i < sources.length; i++) {
        Reflect.ownKeys(sources[i]).forEach((key: (string | symbol)) => {
            let source = sources[i]; 
            let sourceKey = source[key as keyof typeof source];
            if (typeof sourceKey === 'object' && sourceKey !== null) {
                if (target[key as keyof typeof target] === undefined) {
                    target[key] = {};
                    if (Array.isArray(sourceKey)) {
                        target[key] = [];
                    }
                }
                extend(target[key], sourceKey);
            } else {
                if (Array.isArray(sources[i])) {
                    if (key !== 'length') {
                        target[key] = sourceKey;
                    }
                } else {
                    target[key] = sourceKey;
                }
            }
        });
    }
    return target;
}