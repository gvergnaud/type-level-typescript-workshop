import { Equal, Expect, TODO } from "../helpers";

/**
 * TODO:
 * - generic accepting only a union a literals
 * - generic accepting an object and only the keys as second type parameter
 * - generic that accept any function returning something
 * - generic accepting a function get
 */

/**
 * We would like our increment function to accept all kind of parameters
 * which have at least a {count: number} property
 */

namespace one {
  type ExpectAOrB<str extends TODO> = str;

  type res1 = ExpectAOrB<"a">;
  type res2 = ExpectAOrB<"b">;
  // @ts-expect-error
  type res3 = ExpectAOrB<string>;
}

namespace two {
  type Get<obj, key extends TODO> = TODO;

  // TODO
}

namespace three {
  type ExpectFunctionReturningAString<F extends (...args: any) => string> = F;

  type res1 = ExpectFunctionReturningAString<() => string>;
  type res2 = ExpectFunctionReturningAString<() => "a">;
  type res3 = ExpectFunctionReturningAString<() => "b">;
  type res4 = ExpectFunctionReturningAString<(a: number) => string>;
  type res5 = ExpectFunctionReturningAString<(a: string) => string>;
}

namespace four {
  type ExpectFunctionTakingAString<F extends (a: string) => any> = F;

  type res1 = ExpectFunctionTakingAString<(a: string) => void>;
  // @ts-expect-error
  type res2 = ExpectFunctionTakingAString<(a: "a") => void>;
  // @ts-expect-error
  type res3 = ExpectFunctionTakingAString<(a: "b") => void>;
}

namespace five {
  // Get rid of the any and fix it
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
