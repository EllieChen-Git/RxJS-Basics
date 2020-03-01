# RxJS Basics

---

### Tutorial I followed:

- **Video**: [Learn RxJS in 60 Minutes for Beginners - Free Crash Course | DesignCourse](https://www.youtube.com/watch?time_continue=178&v=PhggNGsSQyg&feature=emb_logo)

- **Article**: https://coursetro.com/courses/25/A-Comprehensive-RxJS-Tutorial---Learn-ReactiveX-for-JavaScript-

---

### Files

1. webpack.config.js: Define app's entry point to ./src/code.ts

2. tsconfig.json: Allows us to use es2017 JavaScript (es8) while compiling down to 2015 (es6).

3. index.html

4. src\code.ts

---

### Concepts

- **Stream (values/events over time)**: A stream in RxJS represents values over time. (e.g. Users sending chat messages, users clicking around on a page, users filling out different form fields) => values (or events) that take place over a period of time.

- **Observable (produces a stream of values to observers)**: An observable is a function that produces a stream of values to an observer over time. An observable can have multiple observers.

- **Subscription (subscribe to observable)**: When you subscribe to an observable, you are an observer.

- **Observer (a set of callbacks: next, error, complete)**: Observers read values coming from an observable. An observer is simply a set of callbacks that accept notifications coming from the observer, which include: next, error, complete.

- **Subject (observable + observer)**: An observer that's also able to emit values. It's both an observable and an observer simultaneously. This is unlike an observable, as an observer that's subscribed to an observable can only read values emitted from an observable.

1. add() - You can add child observers.
2. remove() - Removing child observers that were added.
3. unsubscribe() - You can close an observer subscription.

- **BehaviorSubject (only dispatches the last emitted value)**: whose only different is that it will emit the last value upon a new observer's subscription.

- **ReplaySubject (dispatch any designated number of values)**

- **AsyncSubject(only dispatches the last emitted value - subject.complete())**: only emits the very last value, and will only do so once .complete() has been called on the subject.

- **Operators (functional scope)**: Methods that you can use on Observables (and Subjects) that allow you to change the original observable in some manner and return a new observable. (they do not change the original Observable).

1. Static Operators: usually used to create observables (mainly under the creation operators).

2. Instance Operators: methods on observable instances (the majority of RxJS operators that are used).

---

### RxJS

1. **Create an Observable**

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

2. **Create Subscription with Observers (Next, Complete & Error)**

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

3. **Cancel Subscription**

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

4. **Creating Multiple Subscriptions (Subscribe to the same observable)**

```typescript
const subscriptionTwo = observable.subscribe((x: string) => outputToHTML(x));
```

5. **Add/Remove Child Subscriptions**

```typescript
subscription.add(subscriptionTwo);

subscription.remove(subscriptionTwo);
```

6. **Hot vs. Cold Observables**

Cold observable: an observable whose producer is activated once a subscription has been created (i.e. an observable with a producer that's created inside of the observable). Whenever a new subscription is created, it will receive the same values, even the subscription was created at a different time.

Hot observable: when the producer is emitting values outside of the observable.

7. **Subjects**

```typescript
import { Subject } from 'rxjs';

// Create a subject
const subject = new Subject();

// Subscribe to the Subject to create an observer
subject.subscribe(
  data => outputToHTML('Observer 1: ' + data),
  err => outputToHTML(err),
  () => outputToHTML('Completed')
);

// Start emitting values from the observer (.next)
subject.next('1 has been sent'); // observer2 DOESN'T receive this one (before observer2 is created)

// Create 2nd subject
const observer2 = subject.subscribe(data =>
  outputToHTML('Observer 2: ' + data)
);

subject.next('2 has been sent'); // observer2 DOES receive this one
subject.next('3 has been sent'); // observer2 DOES receive this one

// Unsubscribe observer2
observer2.unsubscribe();

subject.next('4 has been sent'); // observer2 DOESN'T receive this one (we unsubscribed observer2 above)
```

8. **BehaviorSubject**

Take 1 compulsory argument (initial emit value)

```typescript
import { BehaviorSubject } from 'rxjs'; // [here]

const subject = new BehaviorSubject('first'); // [here]

subject.subscribe(
  data => outputToHTML('Observer 1: ' + data),
  err => outputToHTML(err),
  () => outputToHTML('Completed')
);

subject.next('1 has been sent');

subject.next('Observer 2 is about to subscribe...'); // [here]

const observer2 = subject.subscribe(data =>
  outputToHTML('Observer 2: ' + data)
);

subject.next('2 has been sent');
subject.next('3 has been sent');

observer2.unsubscribe();

subject.next('4 has been sent');
```

9. **ReplaySubject**

- Take 1 compulsory argument (number of values to be dispatched from observers) and an optional second argument (window time in milliseconds) of a 'new subscription'.

```typescript
import { ReplaySubject } from 'rxjs/ReplaySubject';

// 1st arg: We will only return the last 2 emitted values to new observers:
var subject = new ReplaySubject(2);

// 2nd arg: It allows you to define a maximum number of events to return in the first argument, and the second argument is the time in milliseconds
var subject = new ReplaySubject(30, 200);
```

10. **Operators (merge & map)**

```typescript
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';

const observable1 = Observable.create((observer: any) => {
  observer.next('Hello');
});

const observable2 = Observable.create((observer: any) => {
  observer.next('World');
});

const mergedObservables = merge(observable1, observable2);

mergedObservables
  .pipe(map((value: any) => value.toUpperCase()))
  .subscribe((x: any) => outputToHTML(x));

// from, pluck

import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';

from([
  { first: 'Ellie', last: 'Chen', occupation: 'intern' },
  { first: 'Mario', last: 'Mario', occupation: 'plumber' },
  { first: 'Peach', last: 'Princess', occupation: 'Princess' }
])
  .pipe(pluck('first'))
  .subscribe((s: any) => outputToHTML(s));

function outputToHTML(value: string) {
  const node = document.createElement('li');
  const textNode = document.createTextNode(value);
  node.appendChild(textNode);
  document.getElementById('output').appendChild(node);
}
```

---

### Dependencies

- **TypeScript**

- **RxJS** (https://www.npmjs.com/package/rxjs): Reactive Extensions For JavaScript

- **webpack** (https://www.npmjs.com/package/webpack): Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

- **webpack-dev-server** (https://www.npmjs.com/package/webpack-dev-server): Use webpack with a development server that provides live reloading. This should be used for development only. It uses webpack-dev-middleware under the hood, which provides fast in-memory access to the webpack assets.

- **ts-loader** (https://www.npmjs.com/package/ts-loader): TypeScript loader for webpack.

- **webpack CLI** (https://www.npmjs.com/package/webpack-cli): The official CLI of webpack
