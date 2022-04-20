/* eslint-disable */

// CodeSandbox's eslint has issues with template literal types
// https://github.com/codesandbox/codesandbox-client/issues/6630
// Better have this error once here rather than where you have to use that syntax.
// This an ESLint issue, not a typescript issue, you can trust other errors :)
type TriggerESLintIssue = `${"a"}`;

import { Equal, Expect, TODO } from "../helpers";

// 1. Implement a generic which makes all keys of an object type optional.
namespace one {
  type Partial<obj> = {
    [k in keyof obj]?: obj[k];
  };

  type res1 = Partial<{ a: string }>;
  type test1 = Expect<Equal<res1, { a?: string }>>;

  type res2 = Partial<{ a: string; b: string }>;
  type test2 = Expect<Equal<res2, { a?: string; b?: string }>>;

  type res3 = Partial<{ a: string; b: string; c: string }>;
  type test3 = Expect<Equal<res3, { a?: string; b?: string; c?: string }>>;

  type res4 = Partial<{}>;
  type test4 = Expect<Equal<res4, {}>>;
}

/**
 * 2. Implement a generic picking a union of selected keys
 *    in an object type.
 *
 * Hint: You will need to add a type constraint on one type parameter.
 */
namespace two {
  type Pick<obj, keys extends keyof obj> = {
    [k in keys]: obj[k];
  };

  type res1 = Pick<{ a: string; b: string; c: string }, "a">;
  type test1 = Expect<Equal<res1, { a: string }>>;

  type res2 = Pick<{ a: string; b: string; c: string }, "a" | "b">;
  type test2 = Expect<Equal<res2, { a: string; b: string }>>;

  type res3 = Pick<{ a: string; b: string; c: string }, never>;
  type test3 = Expect<Equal<res3, {}>>;
}

/**
 * 3. Implement a generic which takes an object types, wraps
 *    all properties in a getter function, and rename keys to `get_${key}`.
 *
 * Hint: you will need to use the `as` syntax to rename keys.
 */
namespace three {
  type BuildGetters<obj> = {
    [k in keyof obj & string as `get_${k}`]: () => obj[k];
  };

  type res1 = BuildGetters<{ id: string }>;
  type test1 = Expect<Equal<res1, { get_id: () => string }>>;

  type res2 = BuildGetters<{ id: number; name: string; fortyTwo: 42 }>;
  type test2 = Expect<
    Equal<
      res2,
      { get_id: () => number; get_name: () => string; get_fortyTwo: () => 42 }
    >
  >;
}

namespace bonus {
  /**
   * 4. Implement a generic excluding a union of selected keys
   *    from an object type.
   *
   * Hint: you can use `Exclude<union, excludedUnion>` to get the list
   *       of keys which should remain on the object.
   *       `Exclude` is part of TypeScript's standard library so you
   *       don't need to import it.
   */
  namespace four {
    type Omit<obj, keys extends keyof obj> = {
      [k in Exclude<keyof obj, keys>]: obj[k];
    };

    type res1 = Omit<{ a: string; b: string; c: string }, "a">;
    type test1 = Expect<Equal<res1, { b: string; c: string }>>;

    type res2 = Omit<{ a: string; b: string; c: string }, "a" | "b">;
    type test2 = Expect<Equal<res2, { c: string }>>;

    type res3 = Omit<{ a: string; b: string; c: string }, never>;
    type test3 = Expect<Equal<res3, { a: string; b: string; c: string }>>;
  }

  // 5. Implement a generic excluding values of an object type
  //    if they are assignable to a type passed as second parameter.
  namespace five {
    type KeysToOmit<obj, value> = {
      [k in keyof obj]: obj[k] extends value ? never : k;
    }[keyof obj];

    type OmitByValue<obj, value> = {
      [k in KeysToOmit<obj, value>]: obj[k];
    };

    type User = {
      name: string;
      age: number;
      isAdmin: boolean;
      isNice: boolean;
    };

    type res1 = OmitByValue<User, boolean>;
    type test1 = Expect<Equal<res1, { name: string; age: number }>>;

    type res2 = OmitByValue<User, string>;
    type test2 = Expect<
      Equal<res2, { age: number; isAdmin: boolean; isNice: boolean }>
    >;

    type res3 = OmitByValue<User, number>;
    type test3 = Expect<
      Equal<res3, { name: string; isAdmin: boolean; isNice: boolean }>
    >;
  }

  /**
   * 6. Implement a generic converting all keys of an object
   *    from UPPERCASE to lowercase.
   *
   * Hints: You will need to use the `as` keyword and a Template Literal Type
   */
  namespace six {
    type LowercaseKeys<obj> = {
      [k in keyof obj & string as Lowercase<k>]: obj[k];
    };

    type res1 = LowercaseKeys<{ AGE: number; FIRSTNAME: string }>;
    type test1 = Expect<Equal<res1, { age: number; firstname: string }>>;

    type res2 = LowercaseKeys<{ AGEOFTHECAPTAIN: number }>;
    type test2 = Expect<Equal<res2, { ageofthecaptain: number }>>;
  }
}
