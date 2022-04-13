/* eslint-disable  @typescript-eslint/no-namespace */

import { Equal, Expect, TODO } from "../helpers";

/**
 * 1. Implement a generic returning:
 *     - the second parameter if the first one is true
 *     - the third parameter if the first one is false
 */
namespace one {
  type If<condition extends boolean, branch1, branch2> = TODO;

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
  type GetTypeOfName<input> = TODO;

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

// 3. Implement a generic which takes an object type, a type of key, and a default type,
// and if the object type contains this key, returns its type, otherwise returns
// the default type.
namespace three {
  type SafeGet<obj, key, defaultType> = TODO;

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

// 4. Now update the previous type to only accept keys of the object type
// as second parameter.
namespace four {
  type Get<obj, key> = TODO;

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

/**
 * 5. implement a generic to extract the type parameter
 *    of another generic type
 */
namespace five {
  type UnwrapPromise<input> = TODO;

  type res1 = UnwrapPromise<Promise<"Hello">>;
  type test1 = Expect<Equal<res1, "Hello">>;

  type res2 = UnwrapPromise<Promise<{ name: string; age: number }>>;
  type test2 = Expect<Equal<res2, { name: string; age: number }>>;

  type res3 = UnwrapPromise<"NOT A PROMISE">;
  type test3 = Expect<Equal<res3, "NOT A PROMISE">>;
}

// TODO
namespace nestedTernaries {}
