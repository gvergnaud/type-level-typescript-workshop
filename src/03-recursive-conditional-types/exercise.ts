import { Equal, Expect, Tuple, TODO } from "../helpers";

/**
 * ONE
 */

/**
 * Write a All<Promises> type which turns an array of Promises of value
 * into a Promise of arrays of values.
 *
 * All<[Promise<number>, Promise<string>, Promise<boolean>]> -> [number, string, boolean]
 */

type All<Promises> = TODO;

type res1 = All<[Promise<number>]>;
type test1 = Expect<Equal<res1, [number]>>;

type res2 = All<[Promise<number>, Promise<string>, Promise<boolean>]>;
type test2 = Expect<Equal<res2, [number, string, boolean]>>;

type res3 = All<[Promise<number>, Promise<string>]>;
type test3 = Expect<Equal<res3, [number, string]>>;

type res4 = All<[]>;
type test4 = Expect<Equal<res4, []>>;

function all<Promises extends Tuple>(promises: Promises): All<Promises> {
  return Promise.all(promises) as unknown as All<Promises>;
}

const res5 = all([
  Promise.resolve(2),
  Promise.resolve("string"),
  Promise.resolve(true),
]);

type res5 = typeof res5;
type test5 = Expect<Equal<res5, [number, string, boolean]>>;
