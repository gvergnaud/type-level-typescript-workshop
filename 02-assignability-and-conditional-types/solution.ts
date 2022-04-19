/* eslint-disable */

import { Equal, Expect, TODO } from "../helpers";

/**
 * 1. Implement a generic returning:
 *     - the second parameter if the first one is true
 *     - the third parameter if the first one is false
 */
namespace one {
  type If<condition, branch1, branch2> = condition extends true
    ? branch1
    : branch2;

  type res1 = If<true, string, number>;
  type test1 = Expect<Equal<res1, string>>;

  type res2 = If<false, string, number>;
  type test2 = Expect<Equal<res2, number>>;

  // getting closer to quantum programming with types ? :)
  type res3 = If<boolean, string, number>;
  type test3 = Expect<Equal<res3, string | number>>;
}

/**
 * 2. implement a generic to extract the type of the `name`
 *    property of an object type.
 */
namespace two {
  type GetTypeOfName<input> = input extends { name: infer name } ? name : never;

  type res1 = GetTypeOfName<{ name: "Gabriel" }>;
  type test1 = Expect<Equal<res1, "Gabriel">>;

  type res2 = GetTypeOfName<{ name: string; age: number }>;
  type test2 = Expect<Equal<res2, string>>;

  type res3 = GetTypeOfName<{ age: number }>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = GetTypeOfName<{
    name: { firstName: string; lastName: string };
    age: number;
  }>;
  type test4 = Expect<Equal<res4, { firstName: string; lastName: string }>>;
}

/**
 * 3. implement a generic to extract the type parameter
 *    of another generic type
 */
namespace three {
  type UnwrapPromise<input> = input extends Promise<infer awaited>
    ? awaited
    : input;

  type res1 = UnwrapPromise<Promise<"Hello">>;
  type test1 = Expect<Equal<res1, "Hello">>;

  type res2 = UnwrapPromise<Promise<{ name: string; age: number }>>;
  type test2 = Expect<Equal<res2, { name: string; age: number }>>;

  type res3 = UnwrapPromise<"NOT A PROMISE">;
  type test3 = Expect<Equal<res3, "NOT A PROMISE">>;
}

namespace four {
  type Color = "red" | "green" | "blue" | "white";
  type GetHexColor<color extends Color> = color extends "red"
    ? "#ff0000"
    : color extends "green"
    ? "#00ff00"
    : color extends "blue"
    ? "#0000ff"
    : "#ffffff";

  type res1 = GetHexColor<"red">;
  type test1 = Expect<Equal<res1, "#ff0000">>;

  type res2 = GetHexColor<"green">;
  type test2 = Expect<Equal<res2, "#00ff00">>;

  type res3 = GetHexColor<"blue">;
  type test3 = Expect<Equal<res3, "#0000ff">>;

  type res4 = GetHexColor<"white">;
  type test4 = Expect<Equal<res4, "#ffffff">>;
}

namespace five {
  type SafeGet<obj, key, defaultType> = key extends keyof obj
    ? obj[key] extends infer value
      ? value
      : defaultType
    : defaultType;

  type res1 = SafeGet<{ name: "Gabriel" }, "name", "Anonymous">;
  type test1 = Expect<Equal<res1, "Gabriel">>;

  type res2 = SafeGet<
    { name: { firstName: string; lastName: string }; age: number },
    "name",
    "Anonymous"
  >;
  type test2 = Expect<Equal<res2, { firstName: string; lastName: string }>>;

  type res3 = SafeGet<{ age: 25 }, "name", "Anonymous">;
  type test3 = Expect<Equal<res3, "Anonymous">>;

  type res4 = SafeGet<{ name: string; age: 10 }, "age", 0>;
  type test4 = Expect<Equal<res4, 10>>;
}

namespace bonus {
  namespace six {
    type Get<obj, key extends keyof obj> = obj[key];

    type res1 = Get<{ name: "Gabriel" }, "name">;
    type test1 = Expect<Equal<res1, "Gabriel">>;

    type res2 = Get<
      { name: { firstName: string; lastName: string }; age: number },
      "name"
    >;
    type test2 = Expect<Equal<res2, { firstName: string; lastName: string }>>;
    // @ts-expect-error
    type test3 = Get<{ age: 25 }, "name">;
    // @ts-expect-error
    type test4 = Get<{ name: string }, "age">;
  }

  namespace seven {
    type XOR<bool1, bool2> = [bool1, bool2] extends [true, true]
      ? false
      : [bool1, bool2] extends [false, false]
      ? false
      : true;

    type res1 = XOR<true, true>;
    type t1 = Expect<Equal<res1, false>>;

    type res2 = XOR<false, false>;
    type t2 = Expect<Equal<res2, false>>;

    type res3 = XOR<true, false>;
    type t3 = Expect<Equal<res3, true>>;

    type res4 = XOR<false, true>;
    type t4 = Expect<Equal<res4, true>>;
  }
}
