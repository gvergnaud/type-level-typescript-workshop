# Type Level TypeScript

## Introduction

Welcome to the Type Level TypeScript Workshop!

In this course and workshop we hope to take your TypeScript skills from intermediate to **advanced**, and even make a real **TypeScript Wizard** of you! We will start by demonstrating that the type system of TypeScript is much more than simple type annotations: it's actually a full fledged **programming language** in itself! Once you know how to program with types, everything becomes possible. You will no longer feel like your ability to write the abstractions you need is restrained by the type system.

Types are great for many reasons. They **document** the APIs you create, They make developers more **proficient** by providing them smart suggestions as they type and by catching mistakes and typos. The more the type system knows about your code, the better it is at helping you!

Knowing how to write type-level algorithms helps us capture more of the **invariants** of our code in their types, so that the type-checker is able to catch more errors before they reach real users in productions.

In order to get there we first need to aknowledge that the type system of TypeScript is a **real** and **unique** programming language. It's worth starting by learning its fundamentals, just like we would do if we were learning any other programming language. To avoid the confusion between the whole TypeScript language (values and types), and the language of its type system (only types), we will call the latter **Type Level TypeScript** (or **TLTS** for short).

Throughout this course and workshop, we will try to show you the correspondence between the programming concepts you already know like **code branching**, **variable assignment**, **loops** and basic **data structures**, and their type-level equivalent. By assembling those building blocks, we will teach you how to create (large and small) **algorithms** to make sure the code abstractions you create are used as they should be.

It's worth noting that this course isn't a collection of TypeScript tricks! Instead this tries to be a comprehensive course to give you a better understanding of the **fundamentals of the type-level language**. I believe this approach is more empowering because it will help you **solve problems** we **haven't covered** in this course, just by putting the mental model you built to work. Knowing a few tricks can only get you so far, but mastering the building blocks of the language and the way they interact is what will enable you to solve real-world problems.

Finally, we will also see that moving more of the complexity of your code to the type level is a **trade-off** that isn't always worth taking. We will talk about compile time performance, type errors, type-level debugging and other downsides of type level programming. We hope this will help you reflect and take the right decision when using these techniques.

Let's get started!

## The Type Level Language

First we need to make an important distinction between the language of the **value-level** and the language of the **type-level**. What does that mean exactly?

One way to think about it is that the value-level is the code that **will be run** by your environment (may that be a web browser, Node.js, etc).

JavaScript doesn't have types, so naturally **all** of JavaScript is **value-level** code:

```ts
// This is a simple Javascript function:
function sum(a, b) {
  return a + b;
}
```

**TypeScript** let us add **type annotations** to JavaScript and make sure the `sum` function we wrote will never be called with an invalid parameter:

```ts
// Using type annotations:
function sum(a: number, b: number): number {
  return a + b;
}
```

But the type system of TypeScript is much more powerful than that. The code we need to write in the real world sometimes needs to be **generic** and run on types we don't know in advance. For this, we can define type parameters in angle brackets `<A, B, ...>`. We can then pass these type paremeters to **type-level functions** which will often compute the type of the output from the types of inputs:

```ts
// Using type level programming:
function somethingComplex<A, B>(a: A, b: B): DoSomething<A, B> {
  return doSomething(a, b);
}
```

This is what type-level programming is! `DoSomething<A, B>` is type-level code written in a peculiar programming language that is entirely **different** from the language we are used to writing everyday, but just as powerful. We will call this language **Type Level TypeScript** (TLTS).

Real world code example:

```ts
const orgUrl = createURL("org/:orgId", { orgId: "2" });

const dashboardUrl = createURL("org/:orgId/dashboard(/:dashboardId)", {
  orgId: "2",
  dashboardId: "3",
});

const invalid = createURL("org/:orgId/dashboard(/:dashboardId)", {
  orgId: "2",
  oups: ":(", // ⚠️ this shouldn't type-check
});
```

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

### How exercises work

```ts
namespace one {
  type KeyOf<obj> = TODO;

  type res1 = KeyOf<{ a: number }>;
  type test1 = Expect<Equal<res1, "a">>;
}
```

```ts
namespace bonus {
  type AcceptStrings<a> = TODO;

  type test1 = AcceptStrings<string>;

  // @ts-expect-error: not a string!
  type test2 = AcceptStrings<number>;
}
```

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

## Part 2

### Table of content

This is were things become a bit more challenging (and fun!)

In this section we will start writing more complex algorithms, looping through tuples and object types to produce more interesting outputs, etc.

We will also see a new kind of data (structure): template literal types!

## Template Literal Types

Just like template literals at the value level, TypeScript let us use the same interpolation syntax at the type level:

```ts
type FirstName = "Gabriel";
type LastName = "Vergnaud";

type Name = `${FirstName} ${LastName}`; // "Gabriel Vergnaud"
```

---

You can use Template Literal Types with primitive types too:

```ts
type FirstName = "Gabriel";

type Gabriel = `${FirstName} ${string}`; // `Gabriel ${string}`
```

Any string literal starting with `Gabriel ` will be assignable the `Gabriel` type.

---

There are few generics at our disposal to change the casing of string literal types:

```ts
type t1 = Uppercase<"gabriel">;
// => GABRIEL

type t2 = Lowercase<"GABRIEL">;
// => gabriel

type t3 = Capitalize<"gabriel">;
// => Gabriel

type t4 = Uncapitalize<"Gabriel">;
// => gabriel
```

---

They can also be used to stringify other types:

```ts
type T = `${20} ${true}`; // "20 true"
```

---

Template literal types can also be used with union types.
This is very useful when you want to generate a list of combinations from several union types:

```ts
type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

type ClassName = `${Variant}-${Size}`;
// => "primary-sm" | "primary-md" | "primary-lg"
//    | "secondary-sm" | "secondary-md" | "secondary-lg"
```

---

Using template literal types with unions allows for regex-like matching:

```ts
type N = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type FrenchPhoneNumber = `+33 ${N} ${N}${N} ${N}${N} ${N}${N} ${N}${N}`;

type t1 = "+33 1 23 45 67 89" extends FrenchPhoneNumber ? true : false;
// => true

type t2 = "+01 1 23 45 67 89" extends FrenchPhoneNumber ? true : false;
// => false
```

---

You can use `infer` inside a Template Literal Type to extract a subset of the string:

```ts
type GetNameTuple<name> = name extends `${infer firstName} ${infer lastName}`
  ? [firstName, lastName]
  : never;

type t1 = GetNameTuple<"Florent Le Gall">; // ["Florent", "Le Gall"]
type t2 = GetNameTuple<"Gabriel Vergnaud">; // ["Gabriel", "Vergnaud"]
```

---

This is so powerful that it's even possible to write a full fledged SQL database purely at the type level:

```ts
import { Query } from "@codemix/ts-sql";

const db = {
  things: [
    { id: 1, name: "a", active: true },
    { id: 2, name: "b", active: false },
    { id: 3, name: "c", active: true },
  ],
} as const;

type ActiveThings = Query<
  "SELECT id, name AS nom FROM things WHERE active = true",
  typeof db
>;
// => [{ id: 1; nom: "a" }, { id: 3; nom: "c" }]
```

https://github.com/codemix/ts-sql

## Loops

## Advanced Union Types

```ts
type LogStatus = "INFO" | "WARNING" | "ERROR";

type GetColor<status extends LogStatus> = status extends "ERROR"
  ? "red"
  : status extends "WARNING"
  ? "orange"
  : "blue";

type t = GetColor<"INFO" | "WARNING">;
// => "orange" | "blue"
```

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
type FilterNames<n> = n extends `${"A" | "B"}${string}` ? n : never;

type t = FilterNames<"Alice" | "Bob" | "Karl">; // => "Alice" | "Bob"
```

## Mapped types

```ts
type BuildEnum<properties extends string> = {
  [k in properties]: k;
};

type colorsEnum = BuildEnum<"red" | "green" | "blue">;
// => {red: "red", green: "green", blue: "blue"}

type BuildGetters<objectType> = {
  [k in keyof objectType]: () => objectType[k];
};

type t = BuildGetters<{ id: string; name: string }>;
// => {id: () => string, name: () => string}

type OrNull<T> = {
  [K in keyof T]: T[K] | null;
};

type t = OrNull<[number, string]>;
// => [number | null, string | null]

// prettier-ignore
type RenameProperties<obj> = {
  [k in (keyof obj & string) as `new_${k}`]: obj[k];
};

type t = RenameProperties<{ id: number; name: string }>;
// => {new_id: number, new_name: string}
```

## Recursive Conditional Types

With recursive conditional types, we start to really unlock the full potential of a programming language.

We will see how using recursion let us map, filter and reduce tuple types, parse strings, and much more.

🎢 Looping on a tuple type

```ts
type FindById<id, list> = list extends [infer first, ...infer rest]
  ? first extends { id: id }
    ? first
    : FindById<id, rest> // recurse with the rest of the list
  : never;

type Users = [{ id: 1; name: "Florent" }, { id: 2; name: "Gabriel" }];

type result1 = FindById<1, Users>; // { id: 1, name: "Florent" }
type result2 = FindById<2, Users>; // { id: 2, name: "Gabriel" }
```

---

The Structure of a recursive loop is always the same:

```ts
type SomeLoop<list, /* ... 🎁 some params */> =
  list extends [infer first, ...infer rest] // 📥 split the list
    ? first extends /* ... ❓ some condition */
      ? /* ... ✅ base case, break the loop */
      : FindById<rest, /* ... params */> // 🎢 recurse on `rest`
    : someDefault; // ❌ the list is empty
```

---

A reduce loop: transforming a tuple into an object

```ts
type TupleToObject<tuple, acc = {}> = tuple extends [infer first, ...infer rest]
  ? TupleToObject<rest, acc & { [k in first]: first }>
  : acc;

type test1 = TupleToObject<["hello", "everyone"]>;
// => { hello: "hello", everyone: "everyone" }
```

---

The structure of a recursive reduce:

```ts
type SomeReduce<tuple, acc  = /* ... 📦 default value */> =
  tuple extends [infer first, ...infer rest] // 📥 split the list
  ? SomeReduce<rest, /* ... ✍️ accumulation */> // 🎢 recurse on `rest`
  : acc; // 🎁 return the result
```

---

Mapping over a tuple

```ts
type ToNames<list> = list extends [infer first, ...infer rest]
  ? [first extends { name: infer name } ? name : never, ...ToNames<rest>]
  : [];

type Users = [{ id: 1; name: "Florent" }, { id: 2; name: "Gabriel" }];

type result = ToNames<Users>; // ["Florent", "Gabriel"]
```

---

The structure of a mapping loop:

```ts
type SomeMap<list> =
  list extends [infer first, ...infer rest]
    ? [ /* ... your logic */ , ...SomeMap<rest>]
    : [];
```

---

If only we could abstract over this:

```ts
type Map<fn, list> = list extends [infer first, ...infer rest]
  ? [fn<first>, ...Map<fn, rest>]
  : [];

type GetName<T> = T extends { name: infer name } ? name : never;

type Users = [{ id: 1; name: "Florent" }, { id: 2; name: "Gabriel" }];

type result = Map<GetName, Users>; // ["Florent", "Gabriel"]
```

But we can't pass functions as parameters to other
functions in type-level TypeScript (Higher Order Functions).

---

Filtering a tuple

```ts
type OnlyNumbers<list> = list extends [infer first, ...infer rest]
  ? first extends number
    ? [first, ...OnlyNumbers<rest>]
    : OnlyNumbers<rest>
  : [];

type t = OnlyNumbers<[1, 2, "toto", 3, "hello"]>; // [1, 2, 3]
```

The structure of a filter loop:

```ts
type SomeFilter<list> =
  list extends [infer first, ...infer rest]
    ? first extends  /* ... ❓ some condition */
      ? [first, ...SomeFilter<rest>]
      : SomeFilter<rest>
    : [];
```

---

Recursive conditional types with template literal types.

```ts
type UnderscoresToSpaces<str> = str extends `${infer start}_${infer end}`
  ? `${start} ${UnderscoresToSpaces<end>}`
  : str;

type result = UnderscoresToSpaces<"Hello_TypeScripters_of_Devoxx!">;
// => "Hello TypeScripters of Devoxx!"
```

Since every type is a union, there is nothing special you need to do
to handle a union type!

```ts
type UnderscoresToSpaces<str> = str extends `${infer start}_${infer end}`
  ? `${start} ${UnderscoresToSpaces<end>}`
  : str;

type result = UnderscoresToSpaces<"i_love_python" | "i_love_typescript">;
// => "i love python" | "i love typescript"
```
