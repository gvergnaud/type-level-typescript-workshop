# Type-Level TypeScript Workshop

**NOTE: this is a WIP for our Devoxx workshop !**

by @flegall and @gvergnaud

## Naming conventions

While it's very common to use upper-case single letters for generics because it works well for simple types: `Array<T>`, it doesn't read very well.

Instead, let's use a more classic syntax

- Types (functions equivalent at type-level) should be named in camel-case with a leading upper-case letter : `type List = ...`
- Type Parameters (parameters equivalent at type-level) should be named fully in camel-case with a leading lower-case letter : `type List<first, restOfTheList> = ...`
- Inferred types (local variables equivalent at type level), should be named as well in camel-case with a leading lower-case letter : `type GetName<input> = input extends { name: infer name } ? ...`

## Presentation 1 (30 min)

1. ## About us?
1. ## The type level language
   - **it is a language!** (mental model: types is a separate language which has its own syntax an logic)
   - Why type level programming can be useful in the real world
   - summary of what this workshop will cover
1. ## The data
   - difference between primitive and literals
   - object and tuples
     - the `keyof` keyword
     - the `object["somekey"]`
     - `tuple[0]`,`tuple[1]`, etc.
     - `tuple["length"]`
   - arrays and records
1. ## assignability
   - the concept of assignability
     - **types are sets** (mental model: everything is a union)
     - never and unknown (and any)
     - union and intersections of types
   - assignability of literals and primitive types.
   - assignability of arrays and tuples
   - assignability of objects
     - (interesting gotcha with unions and intersections: we don't count the keys but the number of instances.)
   - assignability of unions
   - assignability of functions
     - type variance? https://gist.github.com/gvergnaud/57ef66ea05c539abb2eb787ea0433666
   - assignability quiz
   - syntax for type constraints
1. ## code branching
   - conditional types
     - (mental model: `a extends b` as a question **"is any value of type `a` assignable to a type `b`?"**, or **"is the set `a` included in the set `b`?"**)
     - using ternary operator to write code branches
   - extracting values
     - using `infer` to declare a type variable
       - we can only use it in a the right-hand side of the `extends` keyword of a conditional type.
     - similarities with **destructuring assignment** (or **pattern-matching**).
1. ## Exercises 1 to 3

## Presentation 2: type level algorithms

1. ## introduction
   - Summary
     - we are going to cover loops, and general iteration patterns like map, filter and reduce.
2. ## union types
   - how to concatenate 2 union types
   - How conditional types **distribute** union members over their branches
     - if `a` is a union, `a extends b` will be tested for each member of this union
   - How you can use this to map over a union type
   - how to **filter** a union type
     - this is a good reminder of `never`, the **empty union** type
       and how we can use it to our advantage.
3. ## mapped types
   - object types
   - tuples and arrays are object too, so you can use mapped types for them
4. ## recursive conditional types
   - tuples
   - template literal types
   - this can be used in many ways
     - to map
     - to filter
     - to reduce
5. ## Exercises 4 to 9
6. ## Conclusion
   - limits
     - Performance
       - be careful of the cardinality of your union types! example the (requests union) & (viz union)
       - loops on large objects / tuples

### TODO

- Slides

Florent

- exercises assignability
- exercises conditional types
- test cases recursive conditional types

Gabriel

- (maybe) add exercises on union types
