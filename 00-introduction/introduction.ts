/**
 * # Type Level TypeScript
 */

/*
## Introduction

Welcome to the Type Level TypeScript Workshop!

In this course and workshop we hope to take your TypeScript skills from intermediate to **advanced**, and even make a real **TypeScript Wizard** of you! We will start by demonstrating that the type system of TypeScript is much more than simple type annotations: it's actually a full fledged **programming language** in itself! Once you know how to program with types, everything becomes possible. You will no longer feel like your ability to write the abstractions you need is restrained by the type system.

Types are great for many reasons. They **document** the APIs you create, They make developers more **proficient** by providing them smart suggestions as they type and by catching mistakes and typos. The more the type system knows about your code, the better it is at helping you!

Knowing how to write type-level algorithms helps us capture more of the **invariants** of our code in their types, so that the type-checker is able to catch more errors before they reach real users in productions.

In order to get there we first need to aknowledge that the type system of TypeScript is a **real** and **unique** programming language. We believe it is worth learning it by starting with its fundamentals, just like we would do if we were to try a new programming language. To avoid the confusion between the whole TypeScript language (values and types), and the language of its type system (only types), we will call the latter **Type Level TypeScript** (or **TLTS** for short).

Throughout this course and workshop, we will try to show you the correspondence between the programming concepts you already know (like **code branching**, **variable assignment**, **loops** and basic **data structures**) and their equivalent in Type Level TypeScript. By assembling those building blocks, we will teach you how to create (large and small) **algorithms** to make sure your abstractions are used as they should be.

**⚠️ Attention**: this isn't a collection of TypeScript tricks! Instead this is a comprehensive course to get to know the **fundamentals of the type-level language**. I believe this approach is more empowering because it will help you **solve problems** we **haven't covered** in this course, just by putting your mental model to work. Knowing a few tricks can only get you so far, but mastering the building blocks of the language and the way they interact is what will enable you to solve your real-world problems.

Finally, we will also see that moving more of the complexity of your code to the type level is a **trade-off** that isn't always worth taking. We will talk about compile time performance, type errors, type-level debugging and other downsides of type level programming. We hope this will help you reflect and take the right decision when using these techniques.

Let's get started!
*/

/**
 * ## The Type Level Language
 */

/*
First we need to make an important distinction between the language of the **value-level** and the language of the **value-level**. What does that mean exactly?

One way to think about it is that the value-level is the code that **will be run** by your environment (may that be a web browser, or Node.js, etc) when your app will be used.

JavaScript doesn't have types, so naturally **all** of JavaScript is **value-level** code:
*/

// This is a simple Javascript function:
// @ts-ignore
function sum(a, b) {
  return a + b;
}

/*
 **TypeScript** let us add **type annotations** to JavaScript and make sure the `sum` function we wrote will never be called with an invalid parameter:
 */

// Using type annotations:
function sum2(a: number, b: number): number {
  return a + b;
}

/*
But the type system of TypeScript is much more powerful than that. The code we need to write in the real world sometimes needs to be **generic** and run on types we don't know in advance. For this, we can define type parameters in angle brackets `<A, B, ...>`. We can then pass these type paremeters to **type-level functions** which will often compute the type of the output from the types of inputs:
*/

// Using type level programming:
function somethingComplex<A, B>(a: A, b: B): DoSomething<A, B> {
  // A _very_ complex function wrapping two values in an array:
  return [a, b];
}

/*
This what type-level programming is! `DoSomething<A, B>` is type-level code written in a peculiar programming language that is entirely **different** from the language we are used to write everyday, but just as powerful. We will call this language **Type Level TypeScript** (TLTS).
*/

type DoSomething<A, B> = [A, B];
