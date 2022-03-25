type _Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

export type Equal<X, Y> = _Equal<X, TODO> extends true
  ? true
  : _Equal<X, symbol> extends true
  ? true
  : _Equal<X, Y>;

export type Expect<T extends true> = T;

export type Tuple = [any, ...any[]];

const TODO = Symbol("TODO");
export type TODO = any & typeof TODO;

// { a: string } & { b: string } -> { a: string, b: string }
export type Compute<obj> = { [k in keyof obj]: obj[k] } & unknown;
