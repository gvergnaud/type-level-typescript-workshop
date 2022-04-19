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
