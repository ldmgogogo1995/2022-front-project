export const isObject = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object Object]';

export const isArray = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object Array]';

export const isString = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object string]';

  export const isSSR = (function () {
    try {
      return !(typeof window !== 'undefined' && document !== undefined);
    } catch (e) {
      return true;
    }
  })();