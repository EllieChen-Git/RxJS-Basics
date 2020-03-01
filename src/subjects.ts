import { BehaviorSubject } from 'rxjs';

// Create a subject
const subject = new BehaviorSubject('first');

// Subscribe to the Subject to create an observer
subject.subscribe(
  data => outputToHTML('Observer 1: ' + data),
  err => outputToHTML(err),
  () => outputToHTML('Completed')
);

// Start emitting values from the observer (.next)
subject.next('1 has been sent'); // observer2 DOESN'T receive this one (before observer2 is created)

subject.next('Observer 2 is about to subscribe...');

// Create 2nd subject
const observer2 = subject.subscribe(data =>
  outputToHTML('Observer 2: ' + data)
);

subject.next('2 has been sent'); // observer2 DOES receive this one
subject.next('3 has been sent'); // observer2 DOES receive this one

// Unsubscribe observer2
observer2.unsubscribe();

subject.next('4 has been sent'); // observer2 DOESN'T receive this one (we unsubscribed observer2 above)

// Function to output value to HTML
function outputToHTML(value: string) {
  const node = document.createElement('li');
  const textNode = document.createTextNode(value);
  node.appendChild(textNode);
  document.getElementById('output').appendChild(node);
}
