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
