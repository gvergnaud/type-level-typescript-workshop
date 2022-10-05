/* eslint-disable */

import { Equal, Expect } from "../helpers";

/**
 * 0. Warmup, try assigning "World" to `type Hello`.
 */
namespace zero {
  type Hello = "...";

  type test1 = Expect<Equal<Hello, "World">>;
}
