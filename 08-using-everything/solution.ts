/* eslint-disable */

// CodeSandbox's eslint has issues with template literal types
// https://github.com/codesandbox/codesandbox-client/issues/6630
// Better have this error once here rather than where you have to use that syntax.
// This an ESLint issue, not a typescript issue, you can trust other errors :)
type TriggerESLintIssue = `${"a"}`;

import { Equal, Expect } from "../helpers";

/**
 * 1. Implement a `ExtractUrlParamNames<url>` generic
 *    which returns a union type containing all parameters in
 *    a given url.
 *    Parameters start by `:` and end at the next `/`.
 */
namespace one {
  export type ExtractUrlParamNames<url> =
    url extends `${infer start}/:${infer param}/${infer rest}`
      ? ExtractUrlParamNames<start> | ExtractUrlParamNames<rest> | param
      : url extends `${infer start}/:${infer param}`
      ? ExtractUrlParamNames<start> | param
      : never;

  type res1 = ExtractUrlParamNames<"/user/:username">;
  type test1 = Expect<Equal<res1, "username">>;

  type res2 = ExtractUrlParamNames<"/user/:username/post/:postId">;
  type test2 = Expect<Equal<res2, "username" | "postId">>;

  type res3 =
    ExtractUrlParamNames<"/user/:username/post/:postId/comment/:commentId">;
  type test3 = Expect<Equal<res3, "username" | "postId" | "commentId">>;
}

/**
 * 2. Implement a `ExtractUrlParams<url>` generic extracting
 *    the of url parameters
 */
namespace two {
  type ExtractUrlParams<url> =
    url extends `${infer start}/:${infer param}/${infer rest}`
      ? ExtractUrlParams<start> &
          ExtractUrlParams<rest> & {
            [k in param]: string;
          }
      : url extends `${infer start}/:${infer param}`
      ? ExtractUrlParams<start> & {
          [k in param]: string;
        }
      : {};

  type res1 = ExtractUrlParams<"/user/:username">;
  type test1 = Expect<Equal<res1, { username: string }>>;

  type res2 = ExtractUrlParams<"/user/:username/post/:postId">;
  type test2 = Expect<Equal<res2, { username: string } & { postId: string }>>;
}

namespace bonus {
  // 3. Add optional params.
  namespace three {
    export type ExtractUrlParams<url> =
      url extends `${infer start}(${infer rest})`
        ? ExtractUrlParams<start> & Partial<ExtractUrlParams<rest>>
        : url extends `${infer start}/:${infer param}/${infer rest}`
        ? ExtractUrlParams<start> &
            ExtractUrlParams<rest> & {
              [k in param]: string;
            }
        : url extends `${infer start}/:${infer param}`
        ? ExtractUrlParams<start> & {
            [k in param]: string;
          }
        : {};

    type res3 = ExtractUrlParams<"/dashboard(/:dashboardId)">;
    type test3 = Expect<Equal<res3, { dashboardId?: string }>>;

    type res4 = ExtractUrlParams<"org/:orgId/dashboard(/:dashboardId)">;
    type test4 = Expect<
      Equal<res4, { orgId: string } & { dashboardId?: string }>
    >;
  }

  /**
   * 4. make a `createURL(url, params)` function using the ExtractUrlParams type
   *    to make sure the `params` object is correct!
   */
  namespace four {
    function createURL<T extends string>(
      path: T,
      params: three.ExtractUrlParams<T>
    ): string {
      // ... interpolate params
      return path;
    }

    createURL("org/:orgId/dashboard(/:dashboardId)", { orgId: "2" });
    createURL("org/:orgId/dashboard(/:dashboardId)", {
      orgId: "2",
      dashboardId: "3",
    });
    // @ts-expect-error: orgId is missing
    createURL("org/:orgId/dashboard(/:dashboardId)", { dashboardId: "2" });
    createURL("org/:orgId/dashboard(/:dashboardId)", {
      orgId: "2",
      // @ts-expect-error: "oups" is an invalid param
      oups: ":(",
    });
  }

  // 5. Implement a Wordle at the type level!
  namespace five {
    type todaysSecretWord = "READY";

    type Wordle<str, word = todaysSecretWord> = [str, word] extends [
      `${infer firstLetter}${infer rest}`,
      `${infer wordFirstLetter}${infer wordRest}`
    ]
      ? firstLetter extends wordFirstLetter
        ? ` 🟩 ${Wordle<rest, wordRest>}`
        : todaysSecretWord extends `${string}${firstLetter}${string}`
        ? ` 🟨 ${Wordle<rest, wordRest>}`
        : ` _ ${Wordle<rest, wordRest>}`
      : "";

    type res1 = Wordle<"POINT">;
    type test1 = Expect<Equal<res1, " _  _  _  _  _ ">>;

    type res2 = Wordle<"NAMES">;
    type test2 = Expect<Equal<res2, " _  🟨  _  🟨  _ ">>;

    type res3 = Wordle<"CRANE">;
    type test3 = Expect<Equal<res3, " _  🟨  🟩  _  🟨 ">>;

    type res4 = Wordle<"READS">;
    type test4 = Expect<Equal<res4, " 🟩  🟩  🟩  🟩  _ ">>;

    type res5 = Wordle<"READY">;
    type test5 = Expect<Equal<res5, " 🟩  🟩  🟩  🟩  🟩 ">>;
  }
}
