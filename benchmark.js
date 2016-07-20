import cached from './lib';

import 'babel-polyfill'

const RUN_TIME = 2000;

const baseline = async () => {
  const start = new Date();
  let count = 0;
  while (true) {
    const end = new Date();
    if (end - start > RUN_TIME) {
      console.log(`baseline ${count / (end - start)} operations / ms`);
      return
    }
    count++;
  }
};

const cachedBenchmark = async () => {
  const start = new Date();
  let count = 0;
  while (true) {
    const end = new Date();
    if (end - start > RUN_TIME) {
      console.log(`cached ${count / (end - start)} operations / ms`);
      return;
    }
    count++;
  }
};

(async () => {
  await baseline();
  await cachedBenchmark();
})();
