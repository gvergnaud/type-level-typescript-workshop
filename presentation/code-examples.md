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

### Objects and tuples

Object types and tuples are the type-level equivalent to object and arrays in JavaScript. We will use them a lot!
They both can contain several other types:

```ts
type AnObject = { name: string; age: number; role: "admin" };

type ATuple = [string, number, "admin"];
```

### Objects

You can access the type of of a property from an object type using square brackets:

```ts
type User = { name: string; age: number; role: "admin" };

type Age = User["age"]; // number
type Role = User["role"]; // "admin"
```

The dot notation (`User.age`) **doesn't** work however!

---

Accessing properties also works with union types!

```ts
type User = { name: string; age: number; role: "admin" };

type AgeOrRole = User["age" | "role"]; // number | "admin"
```

You get a union of the types of the matching values in return.

---

the `keyof` keyword let you retrieve the type of all keys in an object type:

```ts
type User = { name: string; age: number; role: "admin" };

type Keys = keyof User; // "name" | "age" | "role"
```

Which means you can extract the types of all values by combining property access and keyof:

```ts
type User = { name: string; age: number; role: "admin" };

type UserValues = User[keyof User]; //  string | number | "admin"
```

---

You can "merge" two object types with an intersection `&`:

```ts
type WithName = { name: string };
type WithAge = { age: number };

type User = WithName & WithAge;
```

This isn't literally a merge though because properties present on the two types will also be intersected, sometimes resulting in the never type:

```ts
type WithName = { name: string; id: string };
type WithAge = { age: number; id: number };
type User = WithName & WithAge;

type Id = User["id"]; // string & number <=> never
```

### Tuples

You can access tuple properties using indices:

```ts
type SomeTuple = ["Bob", 28];

type Name = SomeTuple[0]; // "Bob"
type Age = SomeTuple[1]; // 28
```

---

the `keyof` keyword isn't very useful with tuples because you will also get all array methods:

```ts
type Keys = keyof ["Bob", 28]; // 0 | 1 | "map" | "filter" | ...
```

---

To get the union of values contained in a Tuple, you can do:

```ts
type SomeTuple = ["Bob", 28];

type Values = SomeTuple[number]; // "Bob" | 28
```

This is similar to how you can get values of an object with `Obj[keyof Obj]`

---

You can concatenate two tuples using `...`, just like you would do
with arrays at the value level:

```ts
type Tuple1 = [1, 2, 3];
type Tuple2 = [4, 5];

type Tuple3 = [...Tuple1, ...Tuple2];
```

### Arrays and records

Arrays (`T[]`) and Records (`{ [k: string]: T }`, or `Record<string, T>`) aren't super useful for type level programming because they contain a single type. That said, you may encounter them quite often because they are pretty widely used at the value level. The most common think you will want to do will be to access their inner type.

```ts
type SomeArray = boolean[];

type Content = SomeArray[number]; // boolean
```

```ts
type SomeRecord = { [k: string]: boolean };

type Content = SomeRecord["_"]; // boolean
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
// Conditions work by checking if A extends B
type t = A extends B ? true : false;

// Simple condition
type is_best_number<n> = n extends 42 ? true : false;

type ok = is_best_number<42>; // true
type ko = is_best_number<41>; // false

// If
type If<A extends boolean, B, C> = A extends true ? B : C;

type t = If<true, number, boolean>; // number

// Nested conditions
type getColor<n> = n extends 0
  ? "black"
  : n extends 1
  ? "cyan"
  : n extends 2
  ? "magenta"
  : "white";
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
const getTeam = ({name, team}) => team

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

type t = First<["alpha", "beta", "gamma"]>; // => alpha
type t = First<[]>; // => never
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
### Mapped types

```ts
type makeEnum<properties extends string> = { [k in properties]: k };
type colorsEnum = makeEnum<"red" | "green" | "blue">;
// => {red: "red", green: "green", blue: "blue"}

type makeGetters<objectType> = {
  [k in keyof objectType]: () => objectType[k];
};
type t = makeGetters<{ id: string; name: string }>;
// => {id: () => string, name: () => string}

type changeArrayType<a extends Array<any>, newType> = {
  [k in keyof a]: newType;
};
type arr1 = changeArrayType<number[], string>;
// => string[]

type numbersOrNull<a extends [...any]> = {
  [k in keyof a]: a[k] extends number ? a[k] : null;
};
type arr2 = numbersOrNull<[42, number, boolean]>;
// => [42, number, null]

```
