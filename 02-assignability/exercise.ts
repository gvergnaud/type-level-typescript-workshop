import { Equal, Expect, TODO } from "../helpers";

/**
 * TODO:
 * - generic accepting only a union a literals literals
 * - generic accepting an object and only the keys as second type parameter
 * - generic accepting only tuples (but not arrays!)
 * - generic that accept any function returning something
 * - generic accepting a function get
 */

/**
 * We would like our increment function to accept all kind of parameters
 * which have at least a {count: number} property
 */

namespace one {
  const increment = (value: any): TODO => {
    value.count++;
    return value;
  };

  const res1 = increment({ type: "car" as const, count: 1 });
  type test1 = Expect<Equal<typeof res1, { type: "car"; count: number }>>;

  const res2 = increment({ type: "velo" as const, count: 2 });
  type test2 = Expect<Equal<typeof res2, { type: "velo"; count: number }>>;

  // @ts-expect-error: no count property on parameter
  const res3 = increment({ type: "moto" as const });
}
