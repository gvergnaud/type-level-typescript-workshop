/* eslint-disable  @typescript-eslint/no-namespace */

import { Equal, Expect, Tuple, TODO } from "../helpers";

/**
 * Implement a Reverse type that takes a tuple and reverses it.
 */
namespace one {
  type Reverse<tuple extends any[]> = TODO;

  type res1 = Reverse<[1, 2, 3, 4]>;
  type test1 = Expect<Equal<res1, [4, 3, 2, 1]>>;

  type res2 = Reverse<[1, 2]>;
  type test2 = Expect<Equal<res2, [2, 1]>>;

  type res3 = Reverse<[]>;
  type test3 = Expect<Equal<res3, []>>;

  type res4 = Reverse<[1]>;
  type test4 = Expect<Equal<res4, [1]>>;
}

// 2. Using a rec. conditional a generic `Every` which given a tuple containing `true` or `false`,
// returns the type `true` if every item in the tuple are equal to `true`.
// Bonus: Find an alternate implementation that doesn't require recursion.
namespace two {
  type Every<tuple extends any[]> = TODO;
}

// 3. Using a rec. conditional a generic `Some` which given a tuple containing `true` or `false`,
// returns the type `true` if at least one item in the tuple is equal to `true`.
// Bonus: Find an alternate implementation that doesn't require recursion.
namespace three {
  type Some<tuple extends any[]> = TODO;
}

/**
 * 1. Implement a `UnwrapPromise` generic type which unwraps all layers
 * of promises and return the value contained inside.
 *
 * For example, `UnwrapPromise<Promise<Promise<number>>>` should
 * return `number`.
 */
namespace two {
  type UnwrapPromise<input> = TODO;

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
namespace three {
  type All<promises extends Array<any>> = TODO;

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
