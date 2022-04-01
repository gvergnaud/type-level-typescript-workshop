import { Equal, Expect } from "../helpers";

/**
 * concepts to cover:
 * - template literal types
 *      - parsing order
 *          - extract first letter of string
 *          - remove first letter
 *          - snake case to camelcase
 *
 *      - object types
 *          - object intersections // maybe no exercise, but we should talk about it
 *          - Mapped types
 *              - construct an object with a generic key
 *              - implement Partial
 *              - Object keys from snake case to camel case
 *      - Recursive conditional types
 *
 */

type FirstLetter<T> = T extends `${infer a}${infer b}` ? [a, b] : never;

type a = FirstLetter<"Bonjour">;

type ExtractUrlParams<url> = url extends `${infer start}(${infer rest})`
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

type res1 = ExtractUrlParams<"/user/:username">;
type test1 = Expect<Equal<res1, { username: string }>>;

type res2 = ExtractUrlParams<"/user/:username/post/:postId">;
type test2 = Expect<Equal<res2, { username: string } & { postId: string }>>;

type res3 = ExtractUrlParams<"/dashboard(/:dashboardId)">;
type test3 = Expect<Equal<res3, { dashboardId?: string }>>;

type res4 = ExtractUrlParams<"org/:orgId/dashboard(/:dashboardId)">;
type test4 = Expect<Equal<res4, { orgId: string } & { dashboardId?: string }>>;

// BONUS: allow any additional query params
