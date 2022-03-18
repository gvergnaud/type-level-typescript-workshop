/**
 * TODO
 *     - object intersections // maybe no exercise, but we should talk about it
 *     - Mapped types
 *         - construct an object with a generic key
 *         - implement Partial
 *
 */

import { Equal, Expect, TODO } from "../helpers";

namespace exercise_1 {
  type Pick<obj, keys> = TODO;

  type res1 = Pick<{ a: string; b: string; c: string }, "a">;
  type test1 = Expect<Equal<res1, { a: string }>>;

  type res2 = Pick<{ a: string; b: string; c: string }, "a" | "b">;
  type test2 = Expect<Equal<res2, { a: string }>>;

  type res3 = Pick<{ a: string; b: string; c: string }, never>;
  type test3 = Expect<Equal<res3, {}>>;
}

namespace exercise_2 {
  type Omit<obj, keys> = TODO;

  type res1 = Omit<{ a: string; b: string; c: string }, "a">;
  type test1 = Expect<Equal<res1, { b: string; c: string }>>;

  type res2 = Omit<{ a: string; b: string; c: string }, "a" | "b">;
  type test2 = Expect<Equal<res2, { c: string }>>;

  type res3 = Omit<{ a: string; b: string; c: string }, never>;
  type test3 = Expect<Equal<res3, { a: string; b: string; c: string }>>;
}

namespace exercise_3 {
  type OmitByValue<obj, value> = TODO;

  type User = {
    name: string
    age: number
    isAdmin: boolean
    isNice: boolean
  }

  type res1 = OmitByValue<User, boolean>
  type test1 = Expect<Equal<res1, { name: string; age: number }>>,
  
  type res2 = OmitByValue<User, string>
  type test2 = Expect<Equal<res2, { age: number; isAdmin: boolean; isNice: boolean }>>,

  type res3 = OmitByValue<User, number>
  type test3 = Expect<Equal<res3, { name: string; isAdmin: boolean; isNice: boolean }>>,
}
