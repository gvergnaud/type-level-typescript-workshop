import { Equal, Expect, TODO } from "../helpers";

// 1. Implement a generic picking a union of selected keys
//    in an object type.
namespace one {
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

// 2. Implement a generic excluding a union of selected keys
//    from an object type.
namespace two {
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

// 3. Implement a generic excluding values of an object type
//    if they are assignable to a type passed as second parameter.
namespace three {
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
