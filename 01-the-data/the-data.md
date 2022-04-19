## The data

Like every program, Type Level programs **transform some data** but unlike other programs, the data they transform are **types**!

To master this language we will need to start by understanding the different sorts of data we have at our disposal.

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

```ts
type Intersections = X & Y;

type Unions = X | Y;
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

type Content = SomeRecord[string]; // boolean
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
