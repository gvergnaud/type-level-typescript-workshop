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
  // @ts-expect-error: "oups" is an invalid param
  createURL("org/:orgId/dashboard(/:dashboardId)", { orgId: "2", oups: ":(" });
}
