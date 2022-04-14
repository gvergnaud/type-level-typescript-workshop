/* eslint-disable  @typescript-eslint/no-namespace */
/* eslint-disable  @typescript-eslint/no-unused-vars */

import { Equal, Expect, TODO } from "../helpers";

/**
 *  1. Implement a generic which extracts the first element of a tuple.
 */
namespace one {
  type Head<tuple extends Array<any>> = TODO;

  type res1 = Head<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, 1>>;

  type res2 = Head<[1]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Head<[]>;
  type test3 = Expect<Equal<res3, never>>;
}

/**
 *  2. Implement a generic which drops the first element of a tuple and returns
 *     all other elements.
 */
namespace two {
  type Shift<tuple extends Array<any>> = TODO;

  type res1 = Shift<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, [2, 3]>>;

  type res2 = Shift<[1]>;
  type test2 = Expect<Equal<res2, []>>;

  type res3 = Shift<[]>;
  type test3 = Expect<Equal<res3, []>>;
}

/**
 *  3. Implement a generic which extracts the last element of a tuple.
 */
namespace three {
  type Last<tuple extends Array<any>> = TODO;

  type res1 = Last<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, 3>>;

  type res2 = Last<[1]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Last<[]>;
  type test3 = Expect<Equal<res3, never>>;
}

/**
 *  4. Implement a generic which drops the last element of a tuple
 *     and return all other elements.
 */
namespace four {
  type Pop<tuple extends Array<any>> = TODO;

  type res1 = Pop<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, [1, 2]>>;

  type res2 = Pop<[1]>;
  type test2 = Expect<Equal<res2, []>>;

  type res3 = Pop<[]>;
  type test3 = Expect<Equal<res3, []>>;
}

/**
 *  5. Implement a generic which pushes a type at the end
 *     of a tuple type.
 */
namespace five {
  type Push<tuple extends Array<any>, element> = TODO;

  type res1 = Push<[1, 2, 3], 4>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

  type res2 = Push<[], 1>;
  type test2 = Expect<Equal<res2, [1]>>;
}

/**
 *  6. Implement a generic which pushes a type at the start
 *     of a tuple type.
 */
namespace six {
  type Unshift<tuple extends Array<any>, element> = TODO;

  type res1 = Unshift<[1, 2, 3], 4>;
  type test1 = Expect<Equal<res1, [4, 1, 2, 3]>>;

  type res2 = Unshift<[], 1>;
  type test2 = Expect<Equal<res2, [1]>>;
}

/**
 *  7. Implement a generic which concatenate two tuple types.
 */
namespace seven {
  type Concat<tuple1 extends Array<any>, tuple2 extends Array<any>> = TODO;

  type res1 = Concat<[1, 2, 3], [4]>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

  type res2 = Concat<[1, 2, 3], []>;
  type test2 = Expect<Equal<res2, [1, 2, 3]>>;
}

/**
 *  8. Implement a generic which takes a type and returns whether this is
 *     a tuple or not.
 */
namespace eight {
  type IsTuple<tuple> = TODO;

  type res1 = IsTuple<[1, 2]>;
  type test1 = Expect<Equal<res1, true>>;

  type res2 = IsTuple<[2]>;
  type test2 = Expect<Equal<res2, true>>;

  type res3 = IsTuple<[]>;
  type test3 = Expect<Equal<res3, true>>; // The empty tuple type `[]` is a tuple!

  type res4 = IsTuple<any[]>;
  type test4 = Expect<Equal<res4, false>>;
}
