import { Equal, Expect, Tuple, TODO } from "../helpers";

type All<Promises> = TODO;

function all<Promises extends Tuple>(promises: Promises): All<Promises> {
  return Promise.all(promises);
}

const result = all([
  Promise.resolve(2),
  Promise.resolve("string"),
  Promise.resolve(true),
]);

type cases = [
  Expect<Equal<typeof result, [number, string, boolean]>>,
  Expect<
    Equal<
      All<[Promise<number>, Promise<string>, Promise<boolean>]>,
      [number, string, boolean]
    >
  >,
  Expect<Equal<All<[Promise<number>, Promise<string>]>, [number, string]>>,
  Expect<Equal<All<[]>, []>>
];
