## Type Level TypeScript

### The data

```ts
type Primitives =
  | number
  | string
  | boolean
  | symbol
  | bigint
  | undefined
  | null;
```

```ts
type Literals = 20 | "Hello" | true | 10000n;
```

```ts
type DataStructures =
  | { key1: 1; key2: 2 } // objects
  | { [key: string]: number } // records
  | [1, 2] // tuples
  | number[]; // arrays
```

### Types are sets

```ts
// Everything is a union type!

type U = "a" | "b"; // is the type-level equivalent of:
const u = new Set(["a", "b"]);

type U = "a" | "b" | "a"; // is the type-level equivalent of:
const u = new Set(["a", "b", "a"]); // <=>
const u = new Set(["a", "b"]);

type U = "a"; // is the type-level equivalent of:
const u = new Set(["a"]);

type U = Union1 | Union2; // is the type-level equivalent of:
const u = new Set([...set1, ...set2]);
```

```ts
type U = never; // is the type-level equivalent of:
const u = new Set();

type U = Union1 | never; // is the type-level equivalent of:
const u = new Set([...set1, ...new Set()]); // <=>
const u = set1;
```

### Functions

```ts
type SomeFunction<A, B> = A | B
/*                ----    ----
                   ^       \
                  type      return type
               parameters

    \----------------------/
              ^
           Generic
```

```ts
type Push<item, list extends any[]> = [...list, item]
/*              -----------------
                      ^
                   The constraint.
                   `list` has to be assignable
                   to any[]
```

### Branching

```ts
type If<A extends boolean, B, C> = A extends true ? B : C;

type t = If<true, number, boolean>; // number
```

### Assignability

```ts
// primitives assignability

type t = 1 extends number ? true : false;
// => true

type t = number extends 2 ? true : false;
// => false

type t = "data" extends string ? true : false;
// => true

type t = string extends "dog" ? true : false;
// => false
```


```ts
// booleans assignability

type t = true extends boolean ? true : false;
// => true

type t = false extends boolean ? true : false;
// => true

type t = boolean extends true ? true : false;
// => false
```

```ts
// array assignability

type t = Array<42> extends Array<number> ? true : false;
// => true

type t = Array<number> extends Array<42> ? true : false;
// => false
```


```ts
// object assignability

type t = { a: string; b: string } extends { a: string } ? true : false;
// => ?

type t = { a: string } extends { a: string; b: string } ? true : false;
// => ?
```

```ts
// function assignability

type t = (() => 2) extends () => number ? true : false;
// => ?

type t = (() => number) extends () => 10 ? true : false;
// => ?

type t = ((x: 2) => void) extends (x: number) => void ? true : false;
// => ?

type t = ((x: number) => void) extends (x: 2) => void ? true : false;
// => ?
```

## Code branching = pattern matching

```ts
// we can check several types at once by wrapping
// them in a tuple
type XOR<N extends boolean, M extends boolean> = [N, M] extends [true, true]
  ? false
  : [N, M] extends [false, false]
  ? false
  : true;

type t = XOR<true, false>; // true
type t = XOR<true, true>; // false
```

```ts
// works with nested structure
type IsGabriel<U> = U extends { name: "Gabriel"; team: { name: "dataviz" } }
  ? true
  : false;

type t = IsGabriel<{ name: "Pierre"; team: { name: "dataviz" } }>; // false

type t = IsGabriel<{ name: "Gabriel"; team: { name: "logs" } }>; // false

type t = IsGabriel<{
  name: "Gabriel";
  team: { name: "dataviz"; otherProp: string };
}>; // true
```

```ts
// use `infer` to extract a part of the input type
type GetTeam<U> = U extends { name: string; team: infer Team } ? Team : never;

type t = GetTeam<{ name: "Pierre"; team: { name: "dataviz" } }>;
// => { name: "dataviz" }

type t = GetTeam<{ name: "thibaut"; team: { name: "dashboard" } }>;
// => { name: "dashboard" }

type t = GetTeam<{ team: { name: "logs" } }>;
// => never
```

## Variable assignment

```ts
// you can use `extends infer X` to assign
// the result of an expression to a variable:
type SomeFunction<U> = SuperHeavyComputation<U> extends infer Result
  ? [Result, Result, Result]
  : never; // this will never happen
```

## Loops

### Objects

```ts
type OrNull<T> = {
  [K in keyof T]: T[K] | null;
};
type t = OrNull<{ a: number; b: string }>;
// { a: number | null; b: string | null }
```

### Tuples

Reduce

```ts
type Includes<item, list> = list extends [infer head, ...infer tail]
  ? head extends item
    ? true
    : Includes<item, tail> // recurse with the rest of the list
  : false;

type t = Includes<2, [1, 2, 3]>; // true
type t = Includes<4, [1, 2, 3]>; // false
```

Filter

```ts
type OnlyNumbers<list> = list extends [infer head, ...infer tail]
  ? head extends number
    ? [head, ...OnlyNumbers<tail>]
    : OnlyNumbers<tail>
  : [];

type t = OnlyNumbers<[1, 2, "toto", 3, "hello"]>; // [1, 2, 3]
```

Map

```ts
type MapIsTwo<list> = list extends [infer head, ...infer tail]
  ? [head extends 2 ? true : false, ...MapIsTwo<tail>]
  : [];

type t = MapIsTwo<[1, 2, 3]>; // [false, true, false]
```

It would be nice to be able to write

```ts
type Map<fn, list> = list extends [infer head, ...infer tail]
  ? [fn<head>, ...Map<fn, tail>]
  : [];

type IsTwo<T> = T extends 2 ? true : false;
type t = Map<IsTwo, [1, 2, 3]>; // [false, true, false]
```

### Unions

```ts
type Name = "Alice" | "Bob";

type t = { name: Name }; // { name: "Alice" | "Bob" }

type NameToObject<Name> = Name extends any // always true
  ? { name: Name } // this code will be executed on each item
  : never;

type t = NameToObject<Name>;
// t: { name: "Alice" } | { name: "Bob" }
```

Filter

```ts
type Name = "Alice" | "Bob" | "Karl";

type t = Name extends `${"A" | "B"}${string}` ? { name: Name } : never;
// t: { name: "Alice" } | { name: "Bob" }
```

```ts
const orgUrl = createURL("org/:orgId", { orgId: "2" });

const dashboardUrl = createURL("org/:orgId/dashboard(/:dashboardId)", {
  orgId: "2",
  dashboardId: "3",
});

const invalid = createURL("org/:orgId/dashboard(/:dashboardId)", {
  orgId: "2",
  oups: ":(",
});
```
