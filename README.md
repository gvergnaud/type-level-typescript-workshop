# Type-Level TypeScript Workshop

by @flegall and @gvergnaud

## Naming conventions

While it's very common to use upper-case single letters for generics because it works well for simple types: `Array<T>`, it doesn't read very well.

Instead, let's use a more classic syntax

- Types (functions equivalent at type-level) should be named in camel-case with a leading upper-case letter : `type List = ...`
- Type Parameters (parameters equivalent at type-level) should be named fully in camel-case with a leading lower-case letter : `type List<first, restOfTheList> = ...`
- Inferred types (local variables equivalent at type level), should be named as well in camel-case with a leading lower-case letter : `type GetName<input> = input extends { name: infer name } ? ...`
