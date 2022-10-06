

![Type-Level TypeScript Workshop logo](https://user-images.githubusercontent.com/9265418/194100467-b457d9da-0771-40b2-a822-786b1c150b5a.png)



by [@flegall](https://twitter.com/flornt) and [@gvergnaud](https://twitter.com/GabrielVergnaud)



# Welcome to the ✨ Type-Level TypeScript Workshop ✨



Type-Level TypeScript is a course to take your TypeScript skills from intermediate to **advanced**. It will give you a solid understanding of the type system's fundamentals and guide you through its most advanced features. You will find everything you need to become a real **TypeScript Pro** — not only **in-depth content**, but also **fun challenges** to practice your new skills.

This repository contains many of these challenges. their difficulty gradually increases from beginner to *super advanced*! **Give them a try!**

### [👉 Take the workshop on Codesandbox](https://codesandbox.io/s/github/gvergnaud/type-level-typescript-workshop?file=/00-introduction/exercises.ts)

### [👉 Slides](https://bit.ly/3jUf7ub)

## Introduction

Over the years, the **type system** of TypeScript has grown from basic type annotations to a **large and complex** programming language. If you have ever looked into the code of an open source library you may have found types that looked intimidating and foreign, like some esoteric language coming from another planet.

Library code often needs to be much more abstract than the code we are used to writing; that's why it makes extensive usage of advanced TypeScript features such as **Generics**, **Conditional Types**, **Mapped Types** or even **Recursive Types**. I personally learned these concepts while working on [TS-Pattern](https://github.com/gvergnaud/ts-pattern), an open-source library that has the particularity of being extremely hard to type. In this course, I hope to share what I've learned by reading too much source code and tinkering for hundreds of hours with the type system.

### [👉 Visit type-level-typescript.com to get better at this!](https://type-level-typescript.com)


## Note on naming conventions

While it's very common to use upper-case single letters for generics because it works well for simple types: `Array<T>`, it doesn't read very well when types become more complex.

In this workshop we will be using these naming conventions instead:

- Generics should use TitleCase: `type List<a> = ...`
- Type parameters should use camelCase: `type List<first, restOfTheList> = ...`
- Inferred types (local variables), should use camelCase as well: `type GetName<input> = input extends { name: infer name } ? ...`
