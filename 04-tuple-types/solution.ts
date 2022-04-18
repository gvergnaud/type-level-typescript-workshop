/* eslint-disable */

import { Equal, Expect, TODO } from "../helpers";

/**
 *  1. Implement a generic which extracts the first element of a tuple.
 */
namespace one {
  type Head<tuple extends any[]> = tuple extends [infer head, ...any[]]
    ? head
    : never;

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
  type DropFirst<tuple extends any[]> = tuple extends [any, ...infer rest]
    ? rest
    : [];

  type res1 = DropFirst<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, [2, 3]>>;

  type res2 = DropFirst<[1]>;
  type test2 = Expect<Equal<res2, []>>;

  type res3 = DropFirst<[]>;
  type test3 = Expect<Equal<res3, []>>;
}

/**
 *  3. Implement a generic which adds a type at the end
 *     of a tuple type.
 */
namespace three {
  type Append<tuple extends any[], element> = [...tuple, element];

  type res1 = Append<[1, 2, 3], 4>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

  type res2 = Append<[], 1>;
  type test2 = Expect<Equal<res2, [1]>>;
}

/**
 *  4. Implement a generic which concatenate two tuple types.
 */
namespace four {
  type Concat<tuple1 extends any[], tuple2 extends any[]> = [
    ...tuple1,
    ...tuple2
  ];

  type res1 = Concat<[1, 2, 3], [4]>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

  type res2 = Concat<[1, 2, 3], []>;
  type test2 = Expect<Equal<res2, [1, 2, 3]>>;
}

/**
 *  5. Implement a generic which extracts the last element of a tuple.
 */
namespace five {
  type Last<tuple extends any[]> = tuple extends [...any[], infer tail]
    ? tail
    : never;

  type res1 = Last<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, 3>>;

  type res2 = Last<[1]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Last<[]>;
  type test3 = Expect<Equal<res3, never>>;
}

namespace bonus {
  /**
   *  6. Implement a generic which drops the last element of a tuple
   *     and return all other elements.
   */
  namespace six {
    type DropLast<tuple extends any[]> = tuple extends [...infer rest, any]
      ? rest
      : [];

    type res1 = DropLast<[1, 2, 3]>;
    type test1 = Expect<Equal<res1, [1, 2]>>;

    type res2 = DropLast<[1]>;
    type test2 = Expect<Equal<res2, []>>;

    type res3 = DropLast<[]>;
    type test3 = Expect<Equal<res3, []>>;
  }

  /**
   *  7. Implement a generic which pushes a type at the start
   *     of a tuple type.
   */
  namespace seven {
    type Prepend<tuple extends any[], element> = [element, ...tuple];

    type res1 = Prepend<[1, 2, 3], 4>;
    type test1 = Expect<Equal<res1, [4, 1, 2, 3]>>;

    type res2 = Prepend<[], 1>;
    type test2 = Expect<Equal<res2, [1]>>;
  }

  /**
   *  8. Implement a generic which takes a type and returns whether this is
   *     a tuple or not.
   */
  namespace eight {
    type IsTuple<tuple> = tuple extends [] | [any, ...any[]] ? true : false;

    type res1 = IsTuple<[1, 2]>;
    type test1 = Expect<Equal<res1, true>>;

    type res2 = IsTuple<[2]>;
    type test2 = Expect<Equal<res2, true>>;

    type res3 = IsTuple<[]>;
    type test3 = Expect<Equal<res3, true>>;

    type res4 = IsTuple<any[]>;
    type test4 = Expect<Equal<res4, false>>;
  }
}
