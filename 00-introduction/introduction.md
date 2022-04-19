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

This is what type-level programming is! `DoSomething<A, B>` is type-level code written in a peculiar programming language that is entirely **different** from the language we are used to writing everyday, but just as powerful. We will call this language **Type Level TypeScript** (TLTS)

## The Language

**Type Level TypeScript** is a minimal purely functional language. Functional refers to functional programming, a term you might have heard of already since a lot of the tools and libraries we rely on in web developement have been inspired by functional programming in some way or another.
Functional programming might make you think of concepts like _immutability_, avoiding _side-effect_ in functions, preferring _composition_ of _inheritance_ etc. but what is functional programming language exactly?

Well in the case of **TLTS** it essentially means that functions are the only mean of abstraction we have at our disposal. Functions in TypeScript are called **generics**: they takes one or several **type parameters** and return a single type as **output**. Here is a simple example of a function taking 2 type parameters and wrapping them in a tuple:

```ts
type SomeFunction<A, B> = [A, B];
/*                ----    ----
                   ^       \
                  type      return type
               parameters

    \----------------------/
              ^
           Generic
*/
```

TLTS doesn't have a lot of features, after all it was design exclusively to type actual code that runs in production, so that makes sense! It supports:

- **Code branching**: executing different code paths in function of a condition (the equivalent of the `if`/`else` keywords we use at the value-level).
- **Variable assignment**: declaring a varialbe to use it in an expression (the equivalent of the `var`/`let` keywords we use at the value-level).
- **Basic functions**, such as the one we have seen in the previous example.
- **Loops**, usually through recursion.
- **Equality checks** (===).
- etc.

And here is the list of features it doesn't support:

- **Mutable state**: You can't re-assign a variable to a new value at the type-level.
- **Input/Output**: You can't perform side effects such as logging something to the terminal, reading a file or making an HTTP requests at the type-level. That's fortunate, I really wouldn't want my type system to be able to read my secret password files and send them to a server!
- **Higher Order Functions**: You can't pass a function to another function in **TLTS**. This is a concept we use a lot at the value-level, `array.map/filter/reduce` are higher order functions, so we won't be able to implement these functions at the type-level. In practice, this limitation isn't so bad because we type-level algorithms are usually less complex.

This was a brief overview of the kind of language we will be learning in the upcoming chapters. Now, let's jump to our first challenge! For that, open the `00-introduction/exercise.ts` file next to this one and keep reading to understand how to solve those challenges.

## How exercises work

Exercise modules contain several challenges. Each of them are defined within a `namespace`. This is a TypeScript feature that isn't used very frequently in real codebase, but for our usecase it's pretty handy. a `namespace` is a scope within which we can define variables which can't collide with other variables defined in this same file.

Each `namespace` contains a single type level function (a generic), which you have to implement:

```ts
// 1. implement a generic to get the union of all keys of an object type.
namespace one {
  type KeyOf<obj> = TODO;

  type res1 = KeyOf<{ a: number }>;
  type test1 = Expect<Equal<res1, "a">>;
}
```

- `TODO` is a special type we provide which makes the type-checker happy while you are reading the statement of the exercise. This is what you need to replace!
- `type res1 = ...` is the value returned by your generic for some input type. You can hover it with your mouse to check it's current value.
- `type test1 = Expect<Equal<res1, ...>>` is a type-level **unit test**. It won't type-check until you found the correct solution for this challenge.

We also add `bonus` namespaces at the end of each exercise module. They are **optional** and we won't have time to correct them during the live version of this workshop, but you are invited to try solving them too, and if you can't figure it out you can still find their solutions in the `./solution.ts` files longside exercises.

```ts
namespace bonus {
  type AcceptStrings<a> = TODO;

  type test1 = AcceptStrings<string>;

  // @ts-expect-error: not a string!
  type test2 = AcceptStrings<number>;
}
```

Note that we sometimes use `@ts-expect-error` comments when we want to test that an invalid input is rejected by the type-checker. `@ts-expect-error` type-checks only if the next line doesn't!
