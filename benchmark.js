/* eslint-disable import/no-extraneous-dependencies, babel/no-await-in-loop, no-console */

import 'babel-polyfill';
import AsyncCache from 'async-cache-promise';

import cached from './lib';

const WARMUP_ITERATIONS = 10000;

const factory = () => Promise.resolve(123);

const setupBenchmark = async ({ fn, name, iterations }) => {
  for (let index = 0; index < WARMUP_ITERATIONS; index += 1) {
    await fn();
  }

  const start = new Date();
  let count = 0;
  for (let index = 0; index < iterations; index += 1) {
    count += 1;
    await fn();
  }
  const end = new Date();

  console.log(`${name} ${count / (end - start)} operations / ms`);
};

(async () => {
  for (const iterations of [10000, 25000]) {
    console.log(`${iterations} iterations`);
    await setupBenchmark({
      fn: factory,
      name: 'baseline',
      iterations
    });
    await setupBenchmark({
      fn: cached(factory),
      name: 'cached',
      iterations
    });
    const cache = new AsyncCache({
      load: factory
    });
    await setupBenchmark({
      fn: () => cache.get(''),
      name: 'async-cache-promise',
      iterations
    });
    console.log();
  }
})();
