export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type Expect<T extends true> = T;

export type Tuple = [any, ...any[]];

export type TODO = any;

// { a: string } & { b: string } -> { a: string, b: string }
export type Compute<obj> = { [k in keyof obj]: obj[k] } & unknown;
