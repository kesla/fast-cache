const fastCache = factory => {
  let cachedPromise;
  const queue = [];

  return () => {
    if (cachedPromise) {
      return cachedPromise;
    }

    if (queue.length === 0) {
      factory()
        .then(result => {
          cachedPromise = Promise.resolve(result);
          queue.forEach(({resolve}) => {
            resolve(result);
          });
          queue.length = 0;
        })
        .catch(err => {
          queue.forEach(({reject}) => {
            reject(err);
          });
          queue.length = 0;
        });
    }

    return new Promise((resolve, reject) => {
      queue.push({resolve, reject});
    });
  };
};

module.exports = fastCache;

fastCache.keyCache = load => {
  const cache = {};
  return key => {
    cache[key] = cache[key] || fastCache(() => load(key));
    return cache[key]();
  };
};
