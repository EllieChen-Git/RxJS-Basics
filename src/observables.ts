import { Observable } from 'rxjs';
import 'rxjs/add/operator/share';

// Create an observable to emit a value
const observable = Observable.create((observer: any) => {
  try {
    observer.next('Hello World');
    observer.next('How are ya?');
    setInterval(() => {
      observer.next("I'm good");
    }, 2000);
    // observer.complete();
    // observer.next('This will not send');
  } catch (err) {
    observer.error(err);
  }
}).shae();

// Subscribe to observable
const subscription = observable.subscribe(
  (x: string) => outputToHTML(x), // observer.next
  (error: string) => outputToHTML(error), // observer.error
  () => outputToHTML('Completed') // observer.complete
);

// Cancel subscription
setTimeout(() => {
  const subscription2 = observable.subscribe((x: string) => {
    outputToHTML('Subscription 2: ' + x);
  });
}, 1000);

// Create a function to output value to HTML
function outputToHTML(value: string) {
  const node = document.createElement('li'); // Create a <li> element
  const textNode = document.createTextNode(value); // Create z text node
  node.appendChild(textNode); // Append text to <li>
  document.getElementById('output').appendChild(node); // Append <li> to '#output (<ul>)'
}
