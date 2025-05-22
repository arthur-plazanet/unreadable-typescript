import { expect, test } from 'vitest';
import { useEnum } from '../src/enum';

enum CatColor {
  red = 'red',
  blue = 'green',
  black = 'black',
  white = 'white',
}

const testEnum = useEnum(CatColor);
test('Enum test', () => {
  expect(testEnum.keys).toEqual(['red', 'blue', 'black', 'white']);
  expect(testEnum.values).toEqual(['red', 'green', 'black', 'white']);

  const isBlueValidCatColorValue = testEnum.hasValue('blue');
  const isBlackValidCatColorKey = testEnum.hasKey('black');

  expect(isBlueValidCatColorValue).toBe(false);
  expect(isBlackValidCatColorKey).toBe(true);
});
