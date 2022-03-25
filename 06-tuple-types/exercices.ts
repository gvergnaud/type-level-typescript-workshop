// TODO introduce after conditional types
// Extract head with extends [infer head, ...]
// Extract tail with extends [..., infer tail]
// Concatenate to tuples

import { Equal, Expect, TODO } from "../helpers";

namespace two {
  type IsTuple<tuple> = TODO;

  type res1 = IsTuple<[1, 2]>;
  type test1 = Expect<Equal<res1, true>>;

  type res2 = IsTuple<[2]>;
  type test2 = Expect<Equal<res2, true>>;

  type res3 = IsTuple<[]>;
  type test3 = Expect<Equal<res3, true>>;

  type res4 = IsTuple<any[]>;
  type test4 = Expect<Equal<res4, false>>;
}
