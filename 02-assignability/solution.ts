/* eslint-disable  @typescript-eslint/no-namespace */
/* eslint-disable  @typescript-eslint/no-unused-vars */

import { Equal, Expect } from "../helpers";

// 1. strings
namespace strings {
  // 1.1. Add a constraint on the two functions types to make typechecking pass
  namespace one {
    function expectString<P extends string>(param: P) {
      return param;
    }

    function expectHello<P extends "hello">(param: P) {
      return param;
    }

    const res1 = (param: string) => expectString(param);
    const res2 = (param: "hello") => expectString(param);
    // @ts-expect-error
    const res3 = (param: number) => expectString(param);

    const res4 = (param: "hello") => expectHello(param);
    // @ts-expect-error
    const res5 = (param: string) => expectHello(param);
  }
}

// 2. objects
namespace objects {
  /**
   * 2.1. Update the type of `increment` to accept all kind of parameters
   * which have at least a `{ count: number }` property.
   */
  namespace one {
    const increment = <input extends { count: number }>(
      value: input
    ): input => {
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

  /**
   * 2.2. implement a `Get` generic which takes an object type
   * and a property name and return the type of its value.
   */
  namespace two {
    type Get<obj, key extends keyof obj> = obj[key];

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

/**
 * 3. Unions
 */
namespace unions {
  /**
   * 3.1 Update `expectCarOrBike` to accept either
   * 'car' or 'bike' and return it's input type.
   */
  namespace one {
    function expectCarOrBike<input extends "car" | "bike">(
      param: input
    ): input {
      return param;
    }

    const res1 = expectCarOrBike("car");
    type test1 = Expect<Equal<typeof res1, "car">>;

    const res2 = expectCarOrBike("bike");
    type test2 = Expect<Equal<typeof res2, "bike">>;

    const param3 = "bike" as "car" | "bike";
    const res3 = expectCarOrBike(param3);
    type test3 = Expect<Equal<typeof res3, "car" | "bike">>;

    const param4: string = "hello";
    // @ts-expect-error
    expectCarOrBike(param4);
  }
}

/// 4. Intersections
namespace intersections {
  /**
   * 4.1. Update `expectUserWithId` to accept the intersection
   * of `User` & `Id` and to return the same type as passed
   */
  namespace one {
    interface User {
      user: string;
    }
    interface Id {
      id: number;
    }

    function expectUserWithId<input extends User & Id>(param: input): input {
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
}

// 5. tuples
namespace tuples {
  // 5.1 Add the correct type constraint.
  namespace one {
    type ExpectTupleOfStringAnd42<F extends [string, 42]> = F;

    type res1 = ExpectTupleOfStringAnd42<[string, 42]>;
    type res2 = ExpectTupleOfStringAnd42<["literal", 42]>;
    // @ts-expect-error number is not assignable to 42
    type res3 = ExpectTupleOfStringAnd42<[string, number]>;
  }
}

// 6. functions
namespace functions {
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

  // 6.1. Add the correct type constraint.
  namespace one {
    type ExpectFunctionReturningAString<F extends (...args: any) => string> = F;

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

  // 6.2. Add the correct type constraint.
  namespace two {
    type ExpectFunctionTakingAString<F extends (a: string) => any> = F;

    type res1 = ExpectFunctionTakingAString<(a: string) => void>;
    // @ts-expect-error a function that takes only an "a" doesn't extends a function that takes a string
    type res2 = ExpectFunctionTakingAString<(a: "a") => void>;
    // @ts-expect-error a function that takes only an "a" doesn't extends a function that takes a string
    type res3 = ExpectFunctionTakingAString<(a: "b") => void>;
  }

  // 6.3. Add the correct type constraint.
  namespace three {
    type ExpectFunctionReturningACar<F extends (...args: any) => Car> = F;

    type res1 = ExpectFunctionReturningACar<() => Car>;
    type res2 = ExpectFunctionReturningACar<(a: number) => SelfDrivingCar>;
    type res3 = ExpectFunctionReturningACar<() => SelfDrivingCar>;
    // @ts-expect-error
    type res4 = ExpectFunctionReturningACar<() => SomethingThatMoves>;
  }

  // 6.4. Add the correct type constraint.
  namespace four {
    type ExpectFunctionTakingACar<F extends (a: Car) => any> = F;

    type res1 = ExpectFunctionTakingACar<(a: Car) => void>;
    type res2 = ExpectFunctionTakingACar<(a: Car) => number>;
    type res3 = ExpectFunctionTakingACar<(a: SomethingThatMoves) => number>;

    // @ts-expect-error a function that takes only a SelfDrivingCar doesn't extends a function that takes a Car
    type res4 = ExpectFunctionTakingACar<(a: SelfDrivingCar) => void>;
  }
}
