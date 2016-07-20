module.exports = factory => {
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
