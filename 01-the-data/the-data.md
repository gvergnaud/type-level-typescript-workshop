# The data of type-level programs

Like with every programming language, in Type Level Typescript we will write code that **transform some data**. The only thing that's different from most other languages is that the data our code will transform are **types**! We will write programs that take some types as input and output some other types.

To master this language we will need to start by understanding the different sorts of data we have at our disposal.

## The three families of types

There are 3 main "families" of data in Type-Level TypeScript (TLTS): primitive types, literal types, and data structure types. Let's explore each of them.

### Primitive types

You are certainly already familiar with primitive types. We use them a lot to annotate our variables and functions in our day to day TypeScript code. Here is the list of primitive types:

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

Every JavaScript value at the exception of objects and functions belong to one of these types. Most primitive types are the home of an infinite number of inhabitant values, like `number` or `string`, but two of them only contain a single lonely inhabitant: the `null` type and the `undefined` type. This specificity makes `null` and `undefined` also part of the second family of data we have at our disposal: **literal types**.

### Literal types

Literal types are "exact" types, which encompass a **single possible value**.

<!-- prettier-ignore -->
```ts
type Literals =
  | 20
  | "Hello"
  | true
  | 10000n
  /* | ... */;
```

A variable of type `20` can only be assigned to the value `20`, A variable of type `"Hello"` can only be assigned to the value `"Hello"`, etc.

```ts
const twenty: 20 = 20; // works!
const twenty: 20 = 100; // ⚠️ Type checking eror: value `100` isn't assignable to type `20`.
```

There's an infinite number of literal types and they look just like regular values, but make no mistake: those are types!

The world of values and the world of types mostly belong to two parallel universes which exist separately but can't "touch" each other and can't be mixed together [(1)](#dependent-types). I think it's helpful to consider literal types as a sort of reflection of values in the world of types, but we need to keep in mind that they are different things.

One notable difference between values and literal types is that you can't write arithmetic expressions at the type-level. For instance `type five = 2 + 3` won't work, even if `const five = 2 + 3` is a perfectly valid piece of value-level code.

Literal types become particarly useful when put in unions to describe variables which can only contain a finite set of possible values like `let trafficLight: "green" | "orange" | "red";`. We will explore union types in more depths in a bit.

### Data structures

In our type-level world, we have four main built-in data structures at our disposal: objects, records, tuples and arrays.

```ts
type DataStructures =
  | { key1: boolean; key2: number } // objects
  | { [key: string]: number } // records
  | [boolean, number] // tuples
  | number[]; // arrays
```

- **Object types** describe objects with a finite set of keys, and these keys contain values of potentially different types.
- **Record types** are similar to object types, except they describe objects with an unknown number of keys, and all values contained in a record share the same type. For example all values in an object of type `{ [key: string]: number }` are numbers.
- **Tuple types** describe arrays with a fixed length. They can have a different type for each index.
- **Array types** describe arrays with an unknown length. all values contained in an array type must have the same type.

It makes sense to split those in 2 sub-groups:

- The sub-group of data structures that can contain **several types**: objects and tuples.
- The sub-group of data structures that contain a **single type**: records and arrays.

At the type-level, we will mostly be using objects and tuples. They are the type level equivalent of JavaScript's objects and arrays and they will enable us to implement some of the algorithms you are already familiar with.

Since records and array types can only contain a single type inside of them, they aren't very useful in type-level programs, so we won't use them very much.

### Union and Intersections are data structures too!

Everything we have seen so far looks somewhat similar to the kind of data we have at the value-level, but unions and intersections are different. They are really specific to the type-level, and building a good mental model of how they work is a little more challenging.

Here is what they look like:

```ts
type Intersections = X & Y;

type Unions = X | Y;
```

We often tend to think of `&` and `|` as operators. They definitely look like operators at first sight because we place them in between two other types, but they actually are data structures too.

In this course, we will see how we can loop through each item inside a union type, how to "map" over a union type to transform each of its items, or how to filter some items out to create a new union type from an existing one. This clearly means that `X | Y` doesn't turn `X` and `Y` into a new opaque type the way an operator would. Since we are still able to access `X` and `Y` afterwards, it looks like `|` is just a way to add them to some kind of "union" data structure.

To get a better grasp at how unions and intersections work, I'll need to take a little detour that is very foundamental to Type-level TypeScript: **all types are Sets**.

### Types are Sets

TODO

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

### Footnotes

#### 1. dependent types

In TypeScript that is. Some languages do allow to mix values and types together in the same expression, and the line between the world of values and the world of types becomes blurrier. We call those ["dependent" type systems](https://en.wikipedia.org/wiki/Dependent_type).
