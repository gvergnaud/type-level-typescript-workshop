/* eslint-disable  @typescript-eslint/no-namespace */

import { Equal, Expect, TODO } from "../helpers";

namespace strings {
  // Add a constraint on the two functions types so that it accepts only a string or only 'a'
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
  namespace one {
    /**
     * We would like our increment function to accept all kind of parameters
     * which have at least a {count: number} property.
     * Get rid of the any and type this function
     */
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

    // @ts-expect-error: no count property on parameter
    const res3 = increment({});
  }

  namespace two {
    /**
     * Let's write a Get type that takes an object type and a named property return the type of the named property
     */
    type Get<obj, key> = TODO;

    type res1 = Get<{ age: number }, "age">;
    type test1 = Expect<Equal<res1, number>>;

    type res2 = Get<{ firstName: string; lastName: string }, "firstName">;
    type test2 = Expect<Equal<res2, string>>;

    type res3 = Get<
      { firstName: string; lastName: string },
      // @ts-expect-error no age_of_the_captain property
      "age_of_the_captain"
    >;
  }
}

namespace unions {
  /**
   * We would like our expectAOrB accept 'a' or 'b' and return the same type as passed
   */
  function expectAOrB(param: TODO) {
    return param;
  }

  const param1: "a" = "a";
  const asA: "a" = expectAOrB(param1);

  const param2: "b" = "b";
  const asB: "b" = expectAOrB(param2);

  const param3: "a" | "b" = "b";
  const asAOrB: "a" | "b" = expectAOrB(param3);

  const param4: string = "b";
  // @ts-expect-error
  expectAOrB(param4);
}

namespace intersections {
  interface User {
    user: string;
  }
  interface Id {
    id: number;
  }

  /**
   * We would like our expectUserWithId to accept the intersection of User & Id and to return the same type as passed
   */
  function expectUserWithId(param: TODO) {
    return param;
  }

  const user: User = { user: "florent" };
  const id = { id: 1234 };
  const userWithId = { user: "florent", id: 1234 };

  const userWithIdAndStatus = { user: "florent", id: 1234, status: "happy" };

  expectUserWithId(userWithId);
  // @ts-expect-error id is missing
  expectUserWithId(user);
  // @ts-expect-error user is missing
  expectUserWithId(id);

  // Should preserve status
  const _: { status: string } = expectUserWithId(userWithIdAndStatus);
}

namespace tuples {
  type ExpectTupleOfStringAnd42<F extends TODO> = F;

  type res1 = ExpectTupleOfStringAnd42<[string, 42]>;
  type res2 = ExpectTupleOfStringAnd42<["literal", 42]>;
  // @ts-expect-error number is not assignable to 42
  type res3 = ExpectTupleOfStringAnd42<[string, number]>;
}

namespace functions {
  namespace one {
    type ExpectFunctionReturningAString<F extends TODO> = F;

    type res1 = ExpectFunctionReturningAString<() => string>;
    type res2 = ExpectFunctionReturningAString<() => "a">;
    type res3 = ExpectFunctionReturningAString<() => "b">;
    type res4 = ExpectFunctionReturningAString<(a: number) => string>;
    type res5 = ExpectFunctionReturningAString<
      (a: number, b: string) => string
    >;
    type res6 = ExpectFunctionReturningAString<(a: string) => string>;
    // @ts-expect-error
    type res7 = ExpectFunctionReturningAString<(a: string) => number>;
  }

  namespace two {
    type ExpectFunctionTakingAString<F extends TODO> = F;

    type res1 = ExpectFunctionTakingAString<(a: string) => void>;
    // @ts-expect-error a function that takes only an "a" doesn't extends a function that takes a string
    type res2 = ExpectFunctionTakingAString<(a: "a") => void>;
    // @ts-expect-error a function that takes only an "a" doesn't extends a function that takes a string
    type res3 = ExpectFunctionTakingAString<(a: "b") => void>;
  }

  interface SomethingThatMoves {
    move: () => void;
  }
  interface Car extends SomethingThatMoves {
    brand: string;
    color: "red" | "green" | "blue";
  }

  interface SelfDrivingCar extends Car {
    autopilot: () => void;
  }

  namespace three {
    type ExpectFunctionReturningACar<F extends TODO> = F;

    type res1 = ExpectFunctionReturningACar<() => Car>;
    type res2 = ExpectFunctionReturningACar<(a: number) => SelfDrivingCar>;
    type res3 = ExpectFunctionReturningACar<() => SelfDrivingCar>;
    // @ts-expect-error
    type res4 = ExpectFunctionReturningACar<() => SomethingThatMoves>;
  }

  namespace four {
    type ExpectFunctionTakingACar<F extends TODO> = F;

    type res1 = ExpectFunctionTakingACar<(a: Car) => void>;
    type res2 = ExpectFunctionTakingACar<(a: Car) => number>;
    type res3 = ExpectFunctionTakingACar<(a: SomethingThatMoves) => number>;

    // @ts-expect-error a function that takes only a SelfDrivingCar doesn't extends a function that takes a Car
    type res4 = ExpectFunctionTakingACar<(a: SelfDrivingCar) => void>;
  }
}
