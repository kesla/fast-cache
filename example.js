import fastCache from 'fast-cache';

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
