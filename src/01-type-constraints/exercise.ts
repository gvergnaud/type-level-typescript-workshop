import { Equal, Expect, TODO } from "../helpers";

/**
 * We would like our increment function to accept all kind of parameters
 * which have at least a {count: number} property
 */
const increment = <T extends TODO>(value: T): T => {
  value.count++;
  return value;
};

const res1 = increment({ type: "car" as const, count: 1 });
type test1 = Expect<Equal<typeof res1, { type: "car"; count: number }>>;

const res2 = increment({ type: "velo" as const, count: 2 });
type test2 = Expect<Equal<typeof res2, { type: "velo"; count: number }>>;

// @ts-expect-error no count property on parameter
const res3 = increment({ type: "moto" as const });
