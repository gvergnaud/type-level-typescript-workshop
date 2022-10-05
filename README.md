

![Type-Level TypeScript Workshop logo](https://user-images.githubusercontent.com/9265418/194098070-59c7d86f-7539-480d-9074-1bd9b6bdf210.png)

by [@flegall](https://twitter.com/flornt) and [@gvergnaud](https://twitter.com/GabrielVergnaud)



# Welcome to the ✨ Type-Level TypeScript Workshop ✨



Type-Level TypeScript is a course to take your TypeScript skills from intermediate to **advanced**. It will give you a solid understanding of the type system's fundamentals and guide you through its most advanced features. You will find everything you need to become a real **TypeScript Pro** — not only **in-depth content**, but also **fun challenges** to practice your new skills.

### [👉 Visite type-level-typescript.com to start learning!](https://type-level-typescript.com)

This repository contains many of these challenges. their difficulty increases over time, from begineer to advanced, and even to *super advanced*! **Give them a try!**

### [👉 Take the workshop on Codesandbox](https://codesandbox.io/s/github/gvergnaud/type-level-typescript-workshop?file=/00-introduction/exercises.ts)

Over the years, the **type system** of TypeScript has grown from basic type annotations to a **large and complex** programming language. If you have ever looked into the code of an open source library you may have found types that looked intimidating and foreign, like some esoteric language coming from another planet. Library code often needs to be much more abstract than the code we are used to writing; that's why it makes extensive usage of advanced TypeScript features such as **Generics**, **Conditional Types**, **Mapped Types** or even **Recursive Types**. I personally learned these concepts while working on [TS-Pattern](https://github.com/gvergnaud/ts-pattern), an open-source library that has the particularity of being extremely hard to type. In this course, I hope to share what I've learned by reading too much source code and tinkering for hundreds of hours with the type system.

**Types are awesome** for many reasons:

- They **document** the code.
- They make developers more **proficient** by providing them with smart suggestions.
- They catch mistakes and typos.

The more the type system knows about your code, **the better it is at helping you**! Once you're fluent in the language of types, **everything becomes possible**. You will no longer feel like the type system restrains your ability to write the abstractions you need.

To get better at this, we first need to acknowledge that **TypeScript's type system is a full-fledged programming language** in itself! It's more than worth learning its fundamentals, just like we would with any other new programming language. Throughout this course, I'll try to show the **correspondence** between programming concepts you already know like **code branching**, **variable assignment**, **loops** and **data structures**, and their type-level equivalent. By assembling these building blocks, you will be able to create powerful **type-level algorithms** that make sure the abstractions you create are always used properly in your entire codebase.

Finally, we will see that moving more of the complexity of your code to the type level is a **trade-off** that isn't always worth taking. We will talk about compile time **performance**, type **errors**, type-level **debugging** and other challenges of type-level programming. I hope this will help you reflect and take the right decision when using these techniques.

It's worth noting that this course isn't a collection of TypeScript tricks! I believe that building a good mental model of the fundamentals is more empowering because it will help you **solve problems** we **haven't covered**. Knowing a few tricks can only get you so far, but mastering the building blocks of the language and the way they interact together will enable you to solve your real-world problems.

### [Let's get started!](https://codesandbox.io/s/github/gvergnaud/type-level-typescript-workshop?file=/00-introduction/exercises.ts)

## Note on naming conventions

While it's very common to use upper-case single letters for generics because it works well for simple types: `Array<T>`, it doesn't read very well when types become more complex.

In this workshop we will be using these naming conventions instead:

- Generics should use TitleCase: `type List<a> = ...`
- Type parameters should use camelCase: `type List<first, restOfTheList> = ...`
- Inferred types (local variables), should use camelCase as well: `type GetName<input> = input extends { name: infer name } ? ...`
