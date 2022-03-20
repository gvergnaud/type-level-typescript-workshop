import { Equal, Expect, Tuple, TODO } from "../helpers";

/**
 * 1. Implement a `UnwrapPromise` generic type which unwraps all layers
 * of promises and return the value contained inside.
 *
 * For example, `UnwrapPromise<Promise<Promise<number>>>` should
 * return `number`.
 */
namespace one {
  export type UnwrapPromise<input> = input extends Promise<infer awaited>
    ? UnwrapPromise<awaited>
    : input;

  type res1 = UnwrapPromise<"NOT A PROMISE">;
  type test1 = Expect<Equal<res1, "NOT A PROMISE">>;

  type res2 = UnwrapPromise<Promise<"Hello">>;
  type test2 = Expect<Equal<res2, "Hello">>;

  type res3 = UnwrapPromise<Promise<Promise<"Hello">>>;
  type test3 = Expect<Equal<res3, "Hello">>;

  type res4 = UnwrapPromise<Promise<Promise<Promise<"Hello">>>>;
  type test4 = Expect<Equal<res4, "Hello">>;
}

/**
 * 2. Write a `All<Promises>` generic type which turns an array
 * of Promises into a Promise containing an array of values.
 *
 * For example, `All<[Promise<number>, Promise<string>, Promise<boolean>]>`
 * should return `[number, string, boolean]`.
 */
namespace two {
  type All<promises> = promises extends [infer head, ...infer tail]
    ? [one.UnwrapPromise<head>, ...All<tail>]
    : [];

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
}
