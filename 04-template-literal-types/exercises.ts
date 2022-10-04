/* eslint-disable */

import { Equal, Expect } from "../helpers";

// CodeSandbox's eslint has issues with template literal types
// https://github.com/codesandbox/codesandbox-client/issues/6630
// Better have this error once here rather than where you have to use that syntax.
// This an ESLint issue, not a typescript issue, you can trust other errors :)
type TriggerESLintIssue = `${"a"}`;

/**
 * 1. find a smart way of combining all horizontal & vertical positions
 *    to generate the `Position` type.
 */
namespace one {
  type Vertical = "top" | "center" | "bottom";
  type Horizontal = "left" | "center" | "right";

  type Position = TODO;

  const Button = ({ position }: { position: Position }) =>
    `<button class="${position}">my button</button>`;

  // The following ones should work as well.
  Button({ position: "top-left" });
  Button({ position: "bottom-center" });
  Button({ position: "top-right" });
  Button({ position: "center-center" });
  Button({ position: "bottom-right" });

  // The following ones should not work !
  // // @ts-expect-error
  // Button({ position: "bottom-middle" });
  // // @ts-expect-error
  // Button({ position: "right-right" });
}

/**
 * 2. Implement a generic extracting the first letter of a string.
 */
namespace two {
  type FirstLetter<word> = TODO;

  type res1 = FirstLetter<"TYPE">;
  type test1 = Expect<Equal<res1, "T">>;

  type res2 = FirstLetter<"Hello Devoxx">;
  type test2 = Expect<Equal<res2, "H">>;
}

/**
 * 3. Implement a generic that puts the first word of a phrase in UPPERCASE
 *
 * Hint: The first word is before the first space.
 */
namespace three {
  type UppercaseFirstWord<word> = TODO;

  type res1 = UppercaseFirstWord<"types are cool">;
  type test1 = Expect<Equal<res1, "TYPES are cool">>;

  type res2 = UppercaseFirstWord<"awesome challenge!">;
  type test2 = Expect<Equal<res2, "AWESOME challenge!">>;
}

namespace bonus {
  /**
   * 4. Implement a generic removing the first letter of a string.
   */
  namespace four {
    type EndOfWord<word> = TODO;

    type res1 = EndOfWord<"TYPE">;
    type test1 = Expect<Equal<res1, "YPE">>;

    type res2 = EndOfWord<"Hello Devoxx">;
    type test2 = Expect<Equal<res2, "ello Devoxx">>;
  }

  /**
   * 5. Implement a generic extracting the first folder of a unix path.
   */
  namespace five {
    type GetFirstFolder<path> = TODO;

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
