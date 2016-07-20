/* eslint-disable babel/no-await-in-loop */

import cached from './lib';

import 'babel-polyfill';

const RUN_TIME = 2000;

const factory = () => Promise.resolve(123);

const baseline = (() => factory => factory)();

const baselineBenchmark = async () => {
  const start = new Date();
  let count = 0;
  let end;
  for (end = new Date(); end - start < RUN_TIME; end = new Date()) {
    count++;
    await baseline();
  }

  console.log(`baseline ${count / (end - start)} operations / ms`);
};

const cachedBenchmark = async () => {
  const start = new Date();
  let count = 0;
  const cachedFactory = cached(factory);
  let end;
  for (end = new Date(); end - start < RUN_TIME; end = new Date()) {
    count++;
    await cachedFactory();
  }
  console.log(`cached ${count / (end - start)} operations / ms`);
};

// I got very irregular perormance running this in an async function
baselineBenchmark()
  .then(cachedBenchmark())
  .catch(err => {
    throw err;
  });
