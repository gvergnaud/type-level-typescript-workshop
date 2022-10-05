/* eslint-disable */

import { Equal, Expect } from "../helpers";

/**
 * 0. Warmup, try assigning "World" to `type Hello`.
 */
namespace zero {
  type Hello = TODO;

  type test1 = Expect<Equal<Hello, "YES">>;
}
