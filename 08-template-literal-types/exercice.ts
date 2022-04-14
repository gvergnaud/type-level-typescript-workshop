/* eslint-disable  @typescript-eslint/no-namespace */
/* eslint-disable  @typescript-eslint/no-unused-vars */

import { Equal, Expect, TODO } from "../helpers";

/**
 * 1. Implement a generic extracting the first letter of a string.
 */
namespace one {
  type FirstLetter<word> = TODO;

  type res1 = FirstLetter<"TYPE">;
  type test1 = Expect<Equal<res1, "T">>;

  type res2 = FirstLetter<"Hello Devoxx">;
  type test2 = Expect<Equal<res2, "H">>;
}

/**
 * 2. Implement a generic removing the first letter of a string.
 */
namespace two {
  type EndOfWord<word> = TODO;

  type res1 = EndOfWord<"TYPE">;
  type test1 = Expect<Equal<res1, "YPE">>;

  type res2 = EndOfWord<"Hello Devoxx">;
  type test2 = Expect<Equal<res2, "ello Devoxx">>;
}

/**
 * 3. find a smarter way of combining all size & colors to generate
 *    the `ClassName` type.
 */
namespace three {
  type Size = "xl" | "l" | "m" | "s" | "xs";
  type Color = "primary" | "secondary" | "tertiary";

  type ClassName = "primary-l" | "secondary-s" | "primary-xl";

  const Button = ({ className }: { className: ClassName }) =>
    `<button class="${className}">my button</button>`;

  Button({ className: "primary-l" });
  Button({ className: "secondary-s" });
  Button({ className: "primary-xl" });
  // The following ones should work as well.
  // Button({ className: "tertiary-xs" });
  // Button({ className: "secondary-lg" });

  // The following ones should not work !
  // @ts-expect-error
  Button({ className: "oups-s" });
  // @ts-expect-error
  Button({ className: "primary-xxs" });
}

/**
 * 4. Implement a generic to convert strings formatted in snake_case
 *    into strings formatted in camelCase.
 */
namespace four {
  type SnakeToCamelCase<word> = TODO;

  type res1 = SnakeToCamelCase<"hello">;
  type test1 = Expect<Equal<res1, "hello">>;

  type res2 = SnakeToCamelCase<"hello_world">;
  type test2 = Expect<Equal<res2, "helloWorld">>;

  type res3 = SnakeToCamelCase<"hello_type_script">;
  type test3 = Expect<Equal<res3, "helloTypeScript">>;
}

/**
 * 5. Implement a generic to converting all keys of an object
 *    from snake_case to camelCase.
 */
namespace five {
  type CamelizeKeys<obj> = TODO;

  type res1 = CamelizeKeys<{ age: number; first_name: string }>;
  type test1 = Expect<Equal<res1, { age: number; firstName: string }>>;

  type res2 = CamelizeKeys<{ age_of_the_captain: number }>;
  type test2 = Expect<Equal<res2, { ageOfTheCaptain: number }>>;
}
