import { TODO } from "../helpers";

/**
 * We would like our increment function to accept all kind of parameters
 * which have at least a {count: number} property
 */
const increment = <T extends TODO>(value: T): T => {
  value.count++;
  return value;
};

const x = increment({ count: 1, type: "voiture" as const });
const y = increment({ count: 2, type: "velo" as const });
// @ts-expect-error no count property on parameter
const z = increment({ type: "moto" as const });
