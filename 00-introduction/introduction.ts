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
