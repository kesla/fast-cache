/* eslint-disable import/no-extraneous-dependencies */

import test from 'tapava';
import cached from './lib';

test('simple', async (t) => {
  const c = cached(() => Promise.resolve(123));
  const actual = await c();
  const expected = 123;

  t.is(actual, expected);
});

test('series', async (t) => {
  let called = 0;
  const c = cached(() => {
    called += 1;
    return Promise.resolve(123);
  });
  await c();
  const actual = await c();
  const expected = 123;

  t.is(actual, expected);
  t.is(called, 1);
});

test('concurrent', async (t) => {
  let called = 0;
  const c = cached(() => {
    called += 1;
    return new Promise((resolve) => {
      setTimeout(() => resolve(123), 5);
    });
  });
  const p1 = c();
  const p2 = c();

  t.is(p1, p2, 'always return same promise');

  const actual = await Promise.all([p1, p2]);
  const expected = [123, 123];

  t.deepEqual(actual, expected);
  t.is(called, 1);
});

test('simple, error', async (t) => {
  const c = cached(() => Promise.reject(new Error('beep')));
  await t.throws(c());
});

test('series, errors', async (t) => {
  let called = 0;
  const c = cached(() => {
    called += 1;
    return Promise.reject(new Error('beep'));
  });

  await t.throws(c());
  await t.throws(c());

  t.is(called, 2);
});

test('concurrent, erros', async (t) => {
  let called = 0;
  const c = cached(() => {
    called += 1;
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('beep')), 5);
    });
  });
  await t.throws(Promise.all([
    c(), c()
  ]));

  t.is(called, 1);
});

test('.keyCache', async (t) => {
  const c = cached.keyCache(id => Promise.resolve(id.toUpperCase()));
  const actual1 = await c('foo');
  const actual2 = await c('foo');
  const actual3 = await c('bar');

  t.is(actual1, 'FOO');
  t.is(actual2, 'FOO');
  t.is(actual3, 'BAR');
});
