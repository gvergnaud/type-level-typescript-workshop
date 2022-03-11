import { Equal, Expect, TODO } from "../helpers";

type ExtractUrlParams = TODO;

type res1 = ExtractUrlParams<"/user/:username">;
type test1 = Expect<Equal<res1, { username: string }>>;

type res2 = ExtractUrlParams<"/user/:username/post/:postId">;
type test2 = Expect<Equal<res2, { username: string; postId: string }>>;

type res3 = ExtractUrlParams<"/dashboard(/:dashboarId)">;
type test3 = Expect<Equal<res3, { dashboarId?: string }>>;

type res4 = ExtractUrlParams<"org/:orgId/dashboard(/:dashboarId)">;
type test4 = Expect<Equal<res4, { orgId: string; dashboarId?: string }>>;

// BONUS: allow any additional query params
