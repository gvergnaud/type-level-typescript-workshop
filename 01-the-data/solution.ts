/* eslint-disable */

import { Equal, Expect, TODO } from "../helpers";

// 1. implement a generic to get the union of all keys  of an object type.
namespace one {
  type KeyOf<obj> = keyof obj;

  type res1 = KeyOf<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, "a" | "b">>;

  type res2 = KeyOf<{ a: number; b: string; c: unknown }>;
  type test2 = Expect<Equal<res2, "a" | "b" | "c">>;

  type res3 = KeyOf<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = KeyOf<{ [k in string]: boolean }>;
  type test4 = Expect<Equal<res4, string>>;
}

// 2. implement a generic to get the union of all values in an object type.
namespace two {
  type ValueOf<obj> = obj[keyof obj];

  type res1 = ValueOf<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, number | string>>;

  type res2 = ValueOf<{ a: number; b: string; c: boolean }>;
  type test2 = Expect<Equal<res2, number | string | boolean>>;

  type res3 = ValueOf<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = ValueOf<{ [k in string]: boolean }>;
  type test4 = Expect<Equal<res4, boolean>>;
}

// 3. implement a generic to get all types inside a tuple.
namespace three {
  // The `extends any[]` part is what we call a "type constraint".
  // We haven't covered constraints yet, but we will in the next chapter.
  // For now, just implement the type by replacing the TODO
  type ValueOf<tuple extends any[]> = tuple[number];

  type res1 = ValueOf<[number, string]>;
  type test1 = Expect<Equal<res1, number | string>>;

  type res2 = ValueOf<[number, string, boolean]>;
  type test2 = Expect<Equal<res2, number | string | boolean>>;

  type res3 = ValueOf<[]>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = ValueOf<boolean[]>;
  type test4 = Expect<Equal<res4, boolean>>;
}

// 4. Implement a generic which gets the length of a tuple type.
namespace four {
  type Length<tuple extends any[]> = tuple["length"];

  type res1 = Length<[]>;
  type test1 = Expect<Equal<res1, 0>>;

  type res2 = Length<[any]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Length<[any, any]>;
  type test3 = Expect<Equal<res3, 2>>;

  type res4 = Length<[any, any, any]>;
  type test4 = Expect<Equal<res4, 3>>;
}
