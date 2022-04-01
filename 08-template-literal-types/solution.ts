import { Equal, Expect, TODO } from "../helpers";

namespace one {
  type FirstLetter<word> = word extends `${infer firstLetter}${infer _}`
    ? firstLetter
    : "";

  type res1 = FirstLetter<"TYPE">;
  type test1 = Expect<Equal<res1, "T">>;

  type res2 = FirstLetter<"Hello Devoxx">;
  type test2 = Expect<Equal<res2, "H">>;
}

namespace two {
  type EndOfWord<word> = word extends `${infer _}${infer endOfWord}`
    ? endOfWord
    : "";

  type res1 = EndOfWord<"TYPE">;
  type test1 = Expect<Equal<res1, "YPE">>;

  type res2 = EndOfWord<"Hello Devoxx">;
  type test2 = Expect<Equal<res2, "ello Devoxx">>;
}

namespace two_5 {
  type Size = "xl" | "l" | "m" | "s" | "xs";
  type Color = "primary" | "secondary" | "tertiary";

  type ClassNames = `${Color}-${Size}`;

  const Button = ({ className }: { className: ClassNames }) =>
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

namespace three {
  type SnakeToCamelCase<word extends string> =
    word extends `${infer firstWord}_${infer rest}`
      ? `${firstWord}${Capitalize<SnakeToCamelCase<rest>>}`
      : word;

  type res1 = SnakeToCamelCase<"hello">;
  type test1 = Expect<Equal<res1, "hello">>;

  type res2 = SnakeToCamelCase<"hello_world">;
  type test2 = Expect<Equal<res2, "helloWorld">>;

  type res3 = SnakeToCamelCase<"hello_type_script">;
  type test3 = Expect<Equal<res3, "helloTypeScript">>;
}

namespace four {
  type SnakeToCamelCase<word extends string> =
    word extends `${infer firstWord}_${infer rest}`
      ? `${firstWord}${Capitalize<SnakeToCamelCase<rest>>}`
      : word;
  type CamelizeKeys<obj> = {
    [k in keyof obj as SnakeToCamelCase<k & string>]: obj[k];
  };

  type res1 = CamelizeKeys<{ age: number; first_name: string }>;
  type test1 = Expect<Equal<res1, { age: number; firstName: string }>>;

  type res2 = CamelizeKeys<{ age_of_the_captain: number }>;
  type test2 = Expect<Equal<res2, { ageOfTheCaptain: number }>>;
}
