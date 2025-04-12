import { expect, test } from 'vitest';
import { isTSInterface } from '../src/utils/is-interface';

interface Cat {
  name: string;
  color: 'tabby' | 'calico' | 'black' | 'white' | 'bald';
  kittens?: number;
}

const invalidCat = {
  name: 'Nyako',
  color: 'white',
  ownerName: 'Power',
};

const properCat = {
  name: 'Chomosuke',
  color: 'black',
};

test('Is interface', () => {
  const isInvalidCat = isTSInterface<Cat>(
    invalidCat,
    ['name', 'color', 'kittens'],
    ['name', 'color']
  );

  const isValidCat = isTSInterface<Cat>(
    properCat,
    ['name', 'color', 'kittens'],
    ['name', 'color']
  );
  expect(isInvalidCat).toBe(false);
  expect(isValidCat).toBe(true);
});
