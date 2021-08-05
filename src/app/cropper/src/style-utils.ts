/**
 * Simple object check.
 * @param item
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep<T, U>(target: T, source: U): T & U;
export function mergeDeep<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export function mergeDeep<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export function mergeDeep(target: object, ...sources: any[]): any;

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any[]) {
  if (!sources.length) { return target; }
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) { Object.assign(target, { [key]: {} }); }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
