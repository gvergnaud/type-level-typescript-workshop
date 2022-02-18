import { Equal, Expect, TODO } from "../helpers";

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
