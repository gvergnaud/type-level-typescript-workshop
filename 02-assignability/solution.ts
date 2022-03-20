import { Expect, Equal } from "../helpers";

const increment = <T extends { count: number }>(value: T): T => {
  value.count++;
  return value;
};

const res1 = increment({ type: "car" as const, count: 1 });
type test1 = Expect<Equal<typeof res1, { type: "car"; count: number }>>;

const res2 = increment({ type: "velo" as const, count: 2 });
type test2 = Expect<Equal<typeof res2, { type: "velo"; count: number }>>;

// @ts-expect-error no count property on parameter
const res3 = increment({ type: "moto" as const });
