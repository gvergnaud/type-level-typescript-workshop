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
