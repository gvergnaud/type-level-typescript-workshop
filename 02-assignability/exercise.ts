import { Equal, Expect, TODO } from "../helpers";

/**
 * TODO:
 * - assignability of literals and primitive types.
 * - assignability of arrays and tuples
 * - assignability of objects
 *    - extends keyof
 *    - optional keys?
 * - assignability of unions
 * - assignability of never and unknown, any
 * - assignability of functions
 * - constraints
 */
namespace one {
  function expectString<P extends TODO>(param: P) {
    return param;
  }

  function expectA<P extends TODO>(param: P) {
    return param;
  }

  const res1 = (param: string) => expectString(param);
  const res2 = (param: "a") => expectString(param);
  // @ts-expect-error
  const res3 = (param: number) => expectString(param);

  const res4 = (param: "a") => expectA(param);
  // @ts-expect-error
  const res5 = (param: string) => expectA(param);
}

// TODO objects assignability tests
namespace objects {
  /**
   * We would like our increment function to accept all kind of parameters
   * which have at least a {count: number} property
   */
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

  namespace two {
    type Get<obj, key extends TODO> = TODO;

    // TODO
  }
}

// TODO union assignability tests
namespace unions {
  namespace one {
    function expectAOrB<P extends TODO>(param: P) {
      return param;
    }

    const param1: "a" = "a";
    expectAOrB(param1);

    const param2: "b" = "b";
    expectAOrB(param2);

    const param3: "a" | "b" = "b";
    expectAOrB(param3);

    const param4: string = "b";
    // @ts-expect-error
    expectAOrB(param4);
  }
}

namespace intersections {}

namespace tuples {}

namespace functions {
  namespace three {
    type ExpectFunctionReturningAString<F extends TODO> = F;

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
}
