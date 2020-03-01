# RxJS Basics

---

### Tutorial I followed:

- Video: [Learn RxJS in 60 Minutes for Beginners - Free Crash Course | DesignCourse](https://www.youtube.com/watch?time_continue=178&v=PhggNGsSQyg&feature=emb_logo)

- Written tutorial: https://coursetro.com/courses/25/A-Comprehensive-RxJS-Tutorial---Learn-ReactiveX-for-JavaScript-

---

### Files

1. webpack.config.js: Define app's entry point to ./src/code.ts
2. tsconfig.json: Allows us to use es2017 JavaScript (es8) while compiling down to 2015 (es6).

3. index.html

4. src\code.ts

---

### Concepts

- Stream: A stream in RxJS represents values over time. (e.g. Users sending chat messages, a user clicking around on a page, a user filling out different form fields in a form) => values (or events) that take place over a period of time.

- Observable: An observable is a function that produces a stream of values to an observer over time. An observable can have multiple observers.

- Subscription: When you subscribe to an observable, you are an observer.

- Observer: Observers read values coming from an observable. An observer is simply a set of callbacks that accept notifications coming from the observer, which include: next, error, complete.

---

### RxJS

1. Create an Observable

```typescript
import { Observable } from 'rxjs';
// '.create()': To create an observable (one way to create observable), and it accepts a single argument 'subscribe function'.
// 'subscribe (function)': accepts an argument 'observer'.
// '.next': To emit a value, we use observer.next("")

// [Verbose way]
// const observable = Observable.create(function subscribe(observer) {
//     observer.next("Hello World")
// })

// [Fat arrow function]
const observable = Observable.create((observer: any) => {
  observer.next('Hello World');
});

// Defining the subscribe function
// Emitting a single value of "Hello World" by calling observer.next().

observable.subscribe((x: string) => console.log(x));
```

2. Create Subscription with Observers (Next, Complete & Error)

```typescript
// When an Observable produces values, it informs the observer, then
// calling .next() when a new value was successfully captured
// calling .error() when an error occurs.

// When we subscribe to an Observable, it will keep passing any values to an observer until
// 1. there are no more values to be sent: it will call .complete() on our observer
// 2. decide we are no longer interested in the values and we unsubscribe.

const observable = Observable.create((observer: any) => {
  try {
    observer.next('Hello World'); // when a new value was successfully captured
    observer.next('How are you?');
    observer.complete(); // there are no more values to be sent
    observer.next('This will not send');
  } catch (err) {
    observer.error(err); // when an error occurs
  }
});

// Subscribe to observable
observable.subscribe(
  (x: string) => outputToHTML(x), // observer.next
  (error: string) => outputToHTML(error), // observer.error
  () => outputToHTML('Completed') // observer.complete
);
```

3. Cancel Subscription

```typescript
const observable = Observable.create((observer: any) => {
  try {
    observer.next('Hello World');
    observer.next('How are you?');
    setInterval(() => {
      observer.next("I'm good");
    }, 2000);
    // observer.complete();
    // observer.next('This will not send');
  } catch (err) {
    observer.error(err);
  }
});

// Subscribe to observable
const subscription = observable.subscribe(
  (x: string) => outputToHTML(x), // observer.next
  (error: string) => outputToHTML(error), // observer.error
  () => outputToHTML('Completed') // observer.complete
);

// Cancel subscription
setTimeout(() => {
  subscription.unsubscribe(); //unsubscribe
}, 6001);
```

4. Creating Multiple Subscriptions (Subscribe to the same observable)

```typescript
const subscriptionTwo = observable.subscribe((x: string) => outputToHTML(x));
```

5. Add/Remove Child Subscriptions

```typescript
subscription.add(subscriptionTwo);

subscription.remove(subscriptionTwo);
```

6. Hot vs. Cold Observables

Cold observable: an observable whose producer is activated once a subscription has been created (i.e. an observable with a producer that's created inside of the observable). Whenever a new subscription is created, it will receive the same values, even the subscription was created at a different time.

Hot observable: when the producer is emitting values outside of the observable.

```typescript
```

```typescript
```

---

### Dependencies

- TypeScript

- RxJS: https://www.npmjs.com/package/rxjs

Reactive Extensions For JavaScript

- webpack: https://www.npmjs.com/package/webpack

webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

- webpack-dev-server: https://www.npmjs.com/package/webpack-dev-server

Use webpack with a development server that provides live reloading. This should be used for development only. It uses webpack-dev-middleware under the hood, which provides fast in-memory access to the webpack assets.

- ts-loader: https://www.npmjs.com/package/ts-loader

TypeScript loader for webpack.

- webpack CLI: https://www.npmjs.com/package/webpack-cli

The official CLI of webpack
