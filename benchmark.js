/* eslint-disable babel/no-await-in-loop */

import cached from './lib';

import 'babel-polyfill';

const RUN_TIME = 2000;
const WARMUP_TIME = 500;

const factory = () => Promise.resolve(123);

const setupBenchmark = ({fn, name}) => async () => {
  const warmupTime = new Date();
  while (new Date() - warmupTime < WARMUP_TIME) {
    await fn();
  }

  const start = new Date();
  let count = 0;
  let end;
  for (end = new Date(); end - start < RUN_TIME; end = new Date()) {
    count++;
    await fn();
  }

  console.log(`${name} ${count / (end - start)} operations / ms`);
};

const baselineBenchmark = setupBenchmark({
  fn: factory,
  name: 'baseline'
});

const cachedBenchmark = setupBenchmark({
  fn: cached(factory),
  name: 'cached'
});

(async () => {
  await baselineBenchmark();
  await cachedBenchmark();
})();
