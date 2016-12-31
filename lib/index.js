const fastCache = (factory) => {
  let cachedPromise;

  return () => {
    if (cachedPromise) {
      return cachedPromise;
    }

    cachedPromise = factory();

    cachedPromise.catch((err) => {
      cachedPromise = null;
      throw err;
    });

    return cachedPromise;
  };
};

module.exports = fastCache;

fastCache.keyCache = (load) => {
  const cache = {};
  return (key) => {
    cache[key] = cache[key] || fastCache(() => load(key));
    return cache[key]();
  };
};
