import { Equal, Expect, TODO } from "../helpers";

namespace exercise_1 {
  type FirstLetter<word> = TODO;

  type res1 = FirstLetter<"TYPE">;
  type test1 = Expect<Equal<res1, "T">>;

  type res2 = FirstLetter<"Hello Devoxx">;
  type test2 = Expect<Equal<res2, "H">>;
}

namespace exercise_2 {
  type EndOfWord<word> = TODO;

  type res1 = EndOfWord<"TYPE">;
  type test1 = Expect<Equal<res1, "YPE">>;

  type res2 = EndOfWord<"Hello Devoxx">;
  type test2 = Expect<Equal<res2, "ello Devoxx">>;
}

namespace exercise_3 {
  type SnakeToCamelCase<word> = TODO;

  type res1 = SnakeToCamelCase<"hello">;
  type test1 = Expect<Equal<res1, "hello">>;

  type res2 = SnakeToCamelCase<"hello_world">;
  type test2 = Expect<Equal<res2, "helloWorld">>;

  type res3 = SnakeToCamelCase<"hello_type_script">;
  type test3 = Expect<Equal<res3, "helloTypeScript">>;
}

namespace exercise_4 {
  type CamelizeKeys<obj> = TODO;

  type res1 = CamelizeKeys<{ age: number; first_name: string }>;
  type test1 = Expect<Equal<res1, { age: number; firstName: string }>>;

  type res2 = CamelizeKeys<{ age_of_the_captain: number }>;
  type test2 = Expect<Equal<res2, { ageOfTheCaptain: number }>>;
}
