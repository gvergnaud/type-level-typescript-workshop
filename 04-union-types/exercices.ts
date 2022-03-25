/**
 * TODO:
 * - implement Exclude
 * - implement Extract
 * - transform a union of values into a union of structure
 * - type never: the empty union
 */

namespace one {
  /**
   * TODO:
   * - implement Exclude
   * - implement Extract
   * - transform a union of values into a union of structure?
   * - type never: the empty union
   */
}

namespace two {
  type ExpectTuple<tuple extends [] | [any, ...any]> = tuple;

  type res1 = ExpectTuple<[1, 2]>;
  type res2 = ExpectTuple<[2]>;
  type res3 = ExpectTuple<[]>;
  // @ts-expect-error
  type res4 = ExpectTuple<any[]>;
}
