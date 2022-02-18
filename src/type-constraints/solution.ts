const increment = <T extends { count: number }>(value: T): T => {
  value.count++;
  return value;
};

const x = increment({ count: 1, type: "voiture" as const });
const y = increment({ count: 2, type: "velo" as const });
// @ts-expect-error
const z = increment({ type: "moto" as const });
