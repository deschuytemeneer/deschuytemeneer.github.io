/** @typedef {[number, number]} Point */

/**
 * @template T
 * Returns an array of length `n` where each item with index `i` is the result of the function `fn`
 * invoked with `i`.
 *
 * @param {number} times
 * @param {(i: number) => T} fn
 * @returns {T[]}
 */
export function repeat(times, fn) {
  let values = [];

  for (let i = 0; i < times; i++) {
    values.push(fn(i));
  }

  return values;
}
