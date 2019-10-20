import { TypeConstructor } from './model';

export function build<T>(ctor: TypeConstructor<T>, ...args): T {
  const instance = new ctor();
  return args.reduce((acc, next) => {
    let ret;
    try {
      ret = Object.assign(acc, next);
    } catch (e) {
      console.warn(e);
      ret = acc;
    }
    return ret;
  }, instance);
}

export function equals(x1: any, x2: any): boolean {

  if (typeof (x1) !== typeof (x2)) {
      return false;
  }

  if ((x1 === null && x2 === null) || (x1 === undefined && x2 === undefined)) {
      return true;
  }

  if (((x1 === null || x1 === undefined) && x2 !== null && x2 !== undefined)
      || ((x2 === null || x2 === undefined) && x1 !== null && x1 !== undefined)) {
      return false;
  }

  if (Array.isArray(x1) && Array.isArray(x2) && x1.length === x2.length) {

      return x1.findIndex((x, index) => !equals(x, x2[index])) === -1 ? true : false;
  }

  if (x1 && typeof (x1) === 'object' && typeof (x2) === 'object'
      && Object.keys(x1).length === Object.keys(x2).length
      && Object.keys(x2).length === arrayUnion(Object.keys(x1), Object.keys(x2)).length) {

      return Object.keys(x1).findIndex(key => !equals(x1[key], x2[key])) === -1;
  }

  return x1 === x2;
}

export function arrayUnion(array1, array2) {
  const a = [...array1, ...array2];
  for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j]) {
              a.splice(j--, 1);
          }
      }
  }

  return a;
}
