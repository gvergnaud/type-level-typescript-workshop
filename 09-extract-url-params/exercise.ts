import { Equal, Expect, TODO } from "../helpers";

/**
 * 1. Implement a `ExtractUrlParams<url>` generic extracting
 *    the of url parameters
 */
namespace one {
  type ExtractUrlParams<url> = TODO;

  type res1 = ExtractUrlParams<"/user/:username">;
  type test1 = Expect<Equal<res1, { username: string }>>;

  type res2 = ExtractUrlParams<"/user/:username/post/:postId">;
  type test2 = Expect<Equal<res2, { username: string; postId: string }>>;
}

// 2. Add optional params.
namespace two {
  type ExtractUrlParams<url> = TODO;

  type res3 = ExtractUrlParams<"/dashboard(/:dashboarId)">;
  type test3 = Expect<Equal<res3, { dashboarId?: string }>>;

  type res4 = ExtractUrlParams<"org/:orgId/dashboard(/:dashboarId)">;
  type test4 = Expect<Equal<res4, { orgId: string; dashboarId?: string }>>;
}

// 3. Add support for regular query params
namespace three {
  type ExtractUrlParams<url> = TODO;
}
