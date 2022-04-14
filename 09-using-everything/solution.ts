/* eslint-disable  @typescript-eslint/no-namespace */
/* eslint-disable  @typescript-eslint/no-unused-vars */

import { Equal, Expect } from "../helpers";

/**
 * 1. Implement a `ExtractUrlParamNames<url>` generic
 *    which returns a union type containing all parameters in
 *    a given url.
 *    Parameters start by `:` and end at the next `/`.
 */
namespace one {
  type ExtractUrlParams<url> =
    url extends `${infer start}/:${infer param}/${infer rest}`
      ? ExtractUrlParams<start> | ExtractUrlParams<rest> | param
      : url extends `${infer start}/:${infer param}`
      ? ExtractUrlParams<start> | param
      : never;

  type res1 = ExtractUrlParams<"/user/:username">;
  type test1 = Expect<Equal<res1, "username">>;

  type res2 = ExtractUrlParams<"/user/:username/post/:postId">;
  type test2 = Expect<Equal<res2, "username" | "postId">>;

  type res3 =
    ExtractUrlParams<"/user/:username/post/:postId/comment/:commentId">;
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

namespace bonus {
  // 4. Bonus: make a `createURL(url, params)` function using the ExtractUrlParams type
  // to make sure the `params` object is correct!
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
    type todaysSecretWorld = "READY";

    type Wordle<str, word = todaysSecretWorld, result extends string = ""> = [
      str,
      word
    ] extends [
      `${infer firstLetter}${infer rest}`,
      `${infer wordFirstLetter}${infer wordRest}`
    ]
      ? firstLetter extends wordFirstLetter
        ? `${result} 🟩 ${Wordle<rest, wordRest>}`
        : todaysSecretWorld extends `${string}${firstLetter}${string}`
        ? `${result} 🟨 ${Wordle<rest, wordRest>}`
        : `${result} _ ${Wordle<rest, wordRest>}`
      : result;

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
