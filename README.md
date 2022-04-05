# Type-Level TypeScript Workshop

by @flegall and @gvergnaud

## Naming conventions

While it's very common to use upper-case single letters for generics because it works well for simple types: `Array<T>`, it doesn't read very well.

Instead, let's use a more classic syntax

- Types (functions equivalent at type-level) should be named in camel-case with a leading upper-case letter : `type List = ...`
- Type Parameters (parameters equivalent at type-level) should be named fully in camel-case with a leading lower-case letter : `type List<first, restOfTheList> = ...`
- Inferred types (local variables equivalent at type level), should be named as well in camel-case with a leading lower-case letter : `type GetName<input> = input extends { name: infer name } ? ...`

## Presentation 1

1. The type level language
   - **it is a language!** (mental model: types is a separate language which has its own syntax an logic)
   - summary of what this workshop will cover
2. The data
   - difference between primitive and literals
   - object and tuples
   - arrays and records
3. ## assignability
   - the concept of assignability
     - **types are sets** (mental model: everything is a union)
     - never and unknown (and any)
     - union of intersections of types
   - assignability of literals and primitive types.
   - assignability of arrays and tuples
   - assignability of objects
   - assignability of unions
   - assignability of functions
     - type variance? https://gist.github.com/gvergnaud/57ef66ea05c539abb2eb787ea0433666
   - syntax for type constraints
4. code branching
   - conditional types
     - (mental model: `a extends b` as a question **"is any value of type a assignable to a type b"**)
     - using ternary operator to write code branches
   - extracting values
     - using `infer` to extract something from a type
     - similarity with **pattern-matching**

## Presentation 2: type level algorithms

- union types
  - how to concatenate 2 union types
  - how to filter a union type
    - this is a good reminder of `never`, the empty union type
      and how we can use it to our advantage.
  - How conditional types distribute union members over their branches
    - if `a` is a union, `a extends b` will be tested for each member of this union
  - How you can use this to map over a union type
- object types
  - mapped types
  - tuples are object too, so you can use mapped type for them
- recursive conditional types
  - tuples
  - template literal types
  - this can be used in many ways
    - to map
    - to filter
    - to reduce
- Performance?
