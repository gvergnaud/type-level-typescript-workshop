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
