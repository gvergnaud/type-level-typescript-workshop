export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

export type Expect<T extends true> = T;

export type Tuple = [any, ...any[]];

const TODO = Symbol("TODO");
export type TODO = typeof TODO;

/**
 * Compute is a helper converting intersections of objects into
 * flat, plain object types.
 *
 * @example
 * Compute<{ a: string } & { b: string }> -> { a: string, b: string }
 */
export type Compute<obj> = { [k in keyof obj]: obj[k] } & unknown;
