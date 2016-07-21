# fast-cache 

Caches a method that returns a promise and does so really fast.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install fast-cache --save
```

## Usage

```js
import fastCache from 'fast-cache';
import {keyCache} from 'fast-cache';

// this will only be called once since it'll get cached
const fn = () => {
  // fetch is just an example, could be something so simple as Promise.resolve(...)
  return fetch('http://example.com')
    .then(response => response.json());
};
const cached = fastCache(fn);

cached().then(json => {
  console.log('json1', json);
});

cached().then(json => {
  console.log('json2', json);
});

const keyBased = keyCache(id => {
  // again, this is just an example. just needs to be something returning a promise
  return fetch(`http://example.com/${id}`);
});

keyBased('id1').then(response => {
  console.log('id1 response', response);
});

keyBased('id2').then(response => {
  console.log('different response from id1', response);
});

```

## Tests

```sh
npm install
npm test
```

## Dependencies

None

## Dev Dependencies

- [async-cache-promise](https://github.com/kesla/async-cache-promise): async-cache - but with promises
- [babel-cli](): Babel command line.
- [babel-core](): Babel compiler core.
- [babel-plugin-syntax-async-functions](https://github.com/babel/babel/tree/master/packages): Allow parsing of async functions
- [babel-plugin-transform-async-to-generator](https://github.com/babel/babel/tree/master/packages): Turn async functions into ES2015 generators
- [babel-polyfill](https://github.com/babel/babel/tree/master/packages): 
- [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages): Babel preset for all es2015 plugins.
- [babel-tape-runner](https://github.com/wavded/babel-tape-runner): Babel + Tape for running your ES Next tests
- [package-json-to-readme](https://github.com/zeke/package-json-to-readme): Generate a README.md from package.json contents
- [tapava](https://github.com/kesla/tapava): the syntax of ava, run through tape
- [xo](https://github.com/sindresorhus/xo): JavaScript happiness style linter ❤️


## License

MIT

_Generated by [package-json-to-readme](https://github.com/zeke/package-json-to-readme)_
