/* eslint-disable */

import { Equal, Expect, TODO } from "../helpers";

/**
 * 0. Warmup, try assigning this type to "NO", and then to "YES".
 */
namespace zero {
  type Do_You_Understand_How_To_Take_These_Challenges = "YES"; // Yes I do!

  type res1 = Do_You_Understand_How_To_Take_These_Challenges;
  // Type level unit test, checking that `res1` is
  // equal to "YES".
  type test1 = Expect<Equal<res1, "YES">>;
}
