import { expect, test } from 'vitest';
import {
  isArray,
  isFunction,
  isString,
  isBoolean,
  isNull,
  isUndefined,
  isObject,
  isPromise,
} from '../src/utils';

const bananaBoat = [1, 2, 3];
const spaghettiMonster = 'noodle surprise';
const dancingDuck = () => 42;
const mysteryBox = { x: 1, y: 'hello' };
const ghostInTheMachine = null;
const voidThing = undefined;
const truthyMcGee = true;
const promiseOfPizza = Promise.resolve('🍕');

test('Confused Monocle Helpers', () => {
  expect(isArray(bananaBoat)).toBe(true);
  expect(isString(spaghettiMonster)).toBe(true);
  expect(isFunction(dancingDuck)).toBe(true);
  expect(isObject(mysteryBox)).toBe(true);
  expect(isNull(ghostInTheMachine)).toBe(true);
  expect(isUndefined(voidThing)).toBe(true);
  expect(isBoolean(truthyMcGee)).toBe(true);
  expect(isPromise(promiseOfPizza)).toBe(true);

  // Falsy checks
  expect(isArray(spaghettiMonster)).toBe(false);
  expect(isString(bananaBoat)).toBe(false);
  expect(isObject(dancingDuck)).toBe(false);
  expect(isPromise(mysteryBox)).toBe(false);
});
