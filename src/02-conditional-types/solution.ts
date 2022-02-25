import { Equal, Expect } from "../helpers";

/**
 * ONE
 */
/**
 * Simple branching with conditional tiles
 */

type If<condition, branch1, branch2> = condition extends true
  ? branch1
  : branch2;
namespace exercise_1 {
  type res1 = If<true, string, number>;
  type test1 = Expect<Equal<res1, string>>;

  type res2 = If<false, string, number>;
  type test2 = Expect<Equal<res2, number>>;

  // getting closer to quantum programming with types ? :)
  //
  type res3 = If<boolean, string, number>;
  type test3 = Expect<Equal<res3, string | number>>;
}

/**
 * TWO
 */

/**
 * ## Using conditional type and infer
 *
 * extract a property of an object type
 */
type GetName<input> = input extends { name: infer name } ? name : never;
namespace exercise_2 {
  type res1 = GetName<{ name: "Gabriel" }>;
  type test1 = Expect<Equal<res1, "Gabriel">>;

  type res2 = GetName<{ name: string; age: number }>;
  type test2 = Expect<Equal<res2, string>>;

  type res3 = GetName<{ age: number }>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = GetName<{
    name: { firstName: string; lastName: string };
    age: number;
  }>;
  type test4 = Expect<Equal<res4, { firstName: string; lastName: string }>>;
}

/**
 * THREE
 */

/**
 * ## Using conditional type and infer
 *
 * extract a parameter from a Generic type
 */
type UnwrapPromise<input> = input extends Promise<infer awaited>
  ? awaited
  : input;
namespace exercise_3 {
  type res1 = UnwrapPromise<Promise<"Hello">>;
  type test1 = Expect<Equal<res1, "Hello">>;

  type res2 = UnwrapPromise<Promise<{ name: string; age: number }>>;
  type test2 = Expect<Equal<res2, { name: string; age: number }>>;

  type res3 = UnwrapPromise<"NOT A PROMISE">;
  type test3 = Expect<Equal<res3, "NOT A PROMISE">>;
}
