module.exports = factory => {
  let cached;
  const queue = [];

  // TODO: handle/test errors
  return () => {
    if (cached) {
      return Promise.resolve(cached);
    }

    if (queue.length === 0) {
      factory()
        .then(result => {
          cached = result;
          queue.forEach(({resolve}) => {
            resolve(cached);
          });
          queue.length = 0;
        });
    }

    return new Promise(resolve => {
      queue.push({resolve});
    });
  };
};
