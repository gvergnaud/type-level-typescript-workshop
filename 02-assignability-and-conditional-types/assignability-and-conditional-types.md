### Code Branching

```ts
// Conditions work by checking if A extends B
type t = A extends B ? true : false;

// Simple condition
type IsBestNumber<n> = n extends 42 ? true : false;

type ok = IsBestNumber<42>; // true
type ko = IsBestNumber<41>; // false

// If
type If<A extends boolean, B, C> = A extends true ? B : C;

type t = If<true, number, boolean>; // number

// Nested conditions
type GetColor<n> = n extends 0
  ? "black"
  : n extends 1
  ? "cyan"
  : n extends 2
  ? "magenta"
  : "white";
```

### Assignability

```ts
// Assignability of variables
const a: 42 = 42;
const b: number = a; // OK, 42 is a number

const a: number = 43;
const b: 42 = a; // Not OK, a number is not assignable as 42.

const a = { id: 42, name: "Florent" };
const b: { id: number } = a;
// OK  {id: 42, name: "Florent"} can be assigned as {id: number}

const a = { id: 42 };
const b: { id: number; name: string } = a;
// Not OK  {id: 42}; an be assigned as {id: number, name: string} it's missing the name property
```

```ts
// primitives assignability

type t = 42 extends number ? true : false;
// => true

type t = number extends 42 ? true : false;
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
// tuple assignability

type t = [42, "datadog"] extends [number, string] ? true : false;
// => true

type t = [number, string] extends [42, "datadog"] ? true : false;
// => false

type t = [42, "datadog"] extends [number] ? true : false;
// => false
```

```ts
// object assignability

type t = { id: string; name: string } extends { id: string } ? true : false;
// => true

type t = { id: string } extends { id: string; name: string } ? true : false;
// => false
```

```ts
// union assignability

type t = { id: string } extends { id: string } | { name: string }
  ? true
  : false;
// => true

type t = { name: string } extends { id: string } | { name: string }
  ? true
  : false;
// => true

type t = { id: string } | { name: string } extends { name: string }
  ? true
  : false;
// => false
```

```ts
// intersection assignability

type t = { id: string } & { name: string } extends { id: string }
  ? true
  : false;
// => true

type t = { id: string } & { name: string } extends { name: string }
  ? true
  : false;
// => true

type t = { id: string } extends { id: string } & { name: string }
  ? true
  : false;
// => false
```

```ts
// function assignability

type t = (() => 42) extends () => number ? true : false;
// => true

type t = (() => number) extends () => 42 ? true : false;
// => false

type t = ((x: 42) => void) extends (x: number) => void ? true : false;
// => false

type t = ((x: number) => void) extends (x: 42) => void ? true : false;
// => true

const a = (n: number) => {};
const b: (n: 1 | 2) => void = x;
// OK, function a accepts any number

const a = (n: 1 | 2) => {};
const b: (n: number) => void = a;
// Not OK, function a only works with 1 | 2, it cannot accept any number.
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
// is the type-level equivalent of:
const getTeam = ({ name, team }) => team;

type t = GetTeam<{ name: "Pierre"; team: { name: "dataviz" } }>;
// => { name: "dataviz" }

type t = GetTeam<{ name: "thibaut"; team: { name: "dashboard" } }>;
// => { name: "dashboard" }

type t = GetTeam<{ team: { name: "logs" } }>;
// => never

// use ìnfer` to extract a part of a tuple
type First<tuple> = tuple extends [infer first, ...any] ? first : never;
// is the type-level equivalent of:
const first = ([first]) => first;

type t = First<["alpha", "beta", "gamma"]>; // => "alpha"
type t = First<[]>; // => never

type Rest<tuple> = tuple extends [any, ...infer rest] ? rest : [];
// is the type-level equivalent of:
const rest = ([first, ...rest]) => rest;

type t = Rest<["alpha", "beta", "gamma"]>; // => ["beta", "gamma"];
type t = Rest<["alpha"]>; // => []
type t = Rest<[]>; // => []
```

## Variable assignment

```ts
// you can use `extends infer X` to assign
// the result of an expression to a variable:
type SomeFunction<U> = SuperHeavyComputation<U> extends infer Result
  ? [Result, Result, Result]
  : never; // this will never happen
```
