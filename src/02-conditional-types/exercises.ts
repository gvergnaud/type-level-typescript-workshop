import { Equal, Expect, TODO } from "../helpers";

/**
 * ONE
 */

/**
 * Simple branching with conditional tiles
 */

type If<Condition, Branch1, Branch2> = TODO;

type res1 = If<true, string, number>;
type test1 = Expect<Equal<res1, string>>;

type res2 = If<false, string, number>;
type test2 = Expect<Equal<res2, number>>;

type res3 = If<false, string, number>;
type test3 = Expect<Equal<res3, string | number>>;

/**
 * TWO
 */

/**
 * ## Using conditional type and infer
 *
 * extract a property of an object type
 */

type GetName<T> = TODO;

type res1 = GetName<{ name: "Gabriel" }>;
type test1 = Expect<Equal<res1, "Gabriel">>;

type res2 = GetName<{ name: string; age: number }>;
type test2 = Expect<Equal<res2, string>>;

type res3 = GetName<{ age: number }, never>;
type test3 = Expect<Equal<res3, never>>;

/**
 * THREE
 */

/**
 * ## Using conditional type and infer
 *
 * extract a parameter from a Generic type
 */

type UnwrapPromise<T> = TODO;

type res1 = UnwrapPromise<Promise<"Hello">>;
type test1 = Expect<Equal<res1, "Hello">>;

type res2 = UnwrapPromise<Promise<{ name: string; age: number }>>;
type test2 = Expect<Equal<res2, { name: string; age: number }>>;

type res3 = UnwrapPromise<"NOT A PROMISE", never>;
type test3 = Expect<Equal<res3, never>>;
