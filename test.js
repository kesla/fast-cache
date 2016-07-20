import test from 'tapava';
import cached from './lib';

test('simple', async t => {
  const c = cached(() => Promise.resolve(123));
  const actual = await c();
  const expected = 123;

  t.is(actual, expected);
});

test('series', async t => {
  let called = 0;
  const c = cached(() => {
    called++;
    return Promise.resolve(123);
  });
  await c();
  const actual = await c();
  const expected = 123;

  t.is(actual, expected);
  t.is(called, 1);
});

test('concurrent', async t => {
  let called = 0;
  const c = cached(() => {
    called++;
    return new Promise(resolve => {
      setTimeout(() => resolve(123), 5);
    });
  });
  const actual = await Promise.all([
    c(), c()
  ]);
  const expected = [123, 123];

  t.deepEqual(actual, expected);
  t.is(called, 1);
});

test('simple, error', async t => {
  const c = cached(() => Promise.reject(new Error('beep')));
  await t.throws(c());
});

test('series, errors', async t => {
  let called = 0;
  const c = cached(() => {
    called++;
    return Promise.reject(new Error('beep'));
  });

  await t.throws(c());
  await t.throws(c());

  t.is(called, 2);
});

test('concurrent, erros', async t => {
  let called = 0;
  const c = cached(() => {
    called++;
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('beep')), 5);
    });
  });
  t.throws(Promise.all([
    c(), c()
  ]));

  t.is(called, 1);
});
