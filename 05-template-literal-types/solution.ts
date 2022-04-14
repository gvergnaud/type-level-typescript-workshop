/* eslint-disable  @typescript-eslint/no-namespace */
/* eslint-disable  @typescript-eslint/no-unused-vars */

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

namespace three {
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

namespace bonus {
  /**
   * 4. Implement a generic extracting the first folder of a unix path.
   */
  namespace four {
    type GetFirstFolder<path> = path extends `/${infer name}/${string}`
      ? name
      : path extends `/${infer name}`
      ? name
      : path extends `${infer name}/${string}`
      ? name
      : never;

    type res1 = GetFirstFolder<"/test">;
    type test1 = Expect<Equal<res1, "test">>;

    type res2 = GetFirstFolder<"/users/gab">;
    type test2 = Expect<Equal<res2, "users">>;

    type res3 = GetFirstFolder<"users/gab">;
    type test3 = Expect<Equal<res3, "users">>;

    type res4 = GetFirstFolder<"root/applications/vscode">;
    type test4 = Expect<Equal<res4, "root">>;
  }
}
