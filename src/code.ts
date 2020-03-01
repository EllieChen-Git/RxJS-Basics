// Operators

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
