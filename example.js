/* eslint-disable */

import fastCache from 'fast-cache';
import { keyCache } from 'fast-cache';

// this will only be called once since it'll get cached
const fn = () => {
  // fetch is just an example, could be something so simple as Promise.resolve(...)
  return fetch('http://example.com')
    .then(response => response.json());
};
const cached = fastCache(fn);

cached().then((json) => {
  console.log('json1', json);
});

cached().then((json) => {
  console.log('json2', json);
});

const keyBased = keyCache((id) => {
  // again, this is just an example. just needs to be something returning a promise
  return fetch(`http://example.com/${id}`);
});

keyBased('id1').then((response) => {
  console.log('id1 response', response);
});

keyBased('id2').then((response) => {
  console.log('different response from id1', response);
});
