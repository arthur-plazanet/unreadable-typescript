/**
 * ============================================================
 *  unreadable-typescript  --  The Readable Tutorial
 * ============================================================
 *
 *  TypeScript can look scary.  This file explains every piece
 *  of the library like you are five years old.
 *
 *  Rule of thumb used everywhere below:
 *    "unknown & Something  becomes  Something"
 *    "unknown" is like a blank piece of paper --
 *     when you glue anything onto blank paper,
 *     you just get the thing you glued.
 */

import { expect, expectTypeOf, test, describe } from 'vitest';
import {
  isString,
  isNumber,
  isArray,
  isFunction,
  isBoolean,
  isNull,
  isUndefined,
  isObject,
  isPromise,
  withoutKey,
} from '../src/utils';
import { useEnum } from '../src/enum';
import { isTSInterface } from '../src/interface';
import { extend, set } from '../src/type/extend-with-unknown';
import type { RenameKey, RenameKeys } from '../src/type/rename-key';
import type { UnreadableType } from './mocks/types';

// ─────────────────────────────────────────────────
//  1.  TYPE GUARDS  -- "Is this thing a ___?"
// ─────────────────────────────────────────────────
//
//  Imagine you have a mystery gift box.
//  You shake it and ask: "Is it a teddy bear?"
//
//  That is what a type guard does.
//  It answers yes or no, and after that
//  TypeScript *remembers* what is inside.
//
//  `(data: unknown): data is string`
//   ^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^
//   "I receive         "After I say true,
//    anything"           you can treat it
//                        as a string"

describe('Type guards -- "What is inside the box?"', () => {
  test('isString -- "Is it words?"', () => {
    // "hello" is words  ->  true
    expect(isString('hello')).toBe(true);

    // 42 is a number, not words  ->  false
    expect(isString(42)).toBe(false);
  });

  test('isNumber -- "Is it a number?" (NaN is NOT a number here)', () => {
    expect(isNumber(7)).toBe(true);
    expect(isNumber(3.14)).toBe(true);

    // NaN looks like a number but it means "Not a Number"
    // so isNumber says no
    expect(isNumber(NaN)).toBe(false);

    expect(isNumber('seven')).toBe(false);
  });

  test('isArray -- "Is it a list of things?"', () => {
    // A shopping list is an array
    expect(isArray(['apple', 'banana'])).toBe(true);

    // A single fruit is not a list
    expect(isArray('apple')).toBe(false);
  });

  test('isFunction -- "Is it something I can call / run?"', () => {
    const sayHi = () => 'hi!';
    expect(isFunction(sayHi)).toBe(true);

    // A plain string cannot be called
    expect(isFunction('hi')).toBe(false);
  });

  test('isBoolean -- "Is it true or false?"', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);

    // "true" the word is a string, not a boolean
    expect(isBoolean('true')).toBe(false);
  });

  test('isNull -- "Is the box completely empty?"', () => {
    expect(isNull(null)).toBe(true);

    // undefined is *missing*, not *empty* -- subtle difference
    expect(isNull(undefined)).toBe(false);
  });

  test('isUndefined -- "Was the box never even created?"', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });

  test('isObject -- "Is it a thing with named properties?"', () => {
    expect(isObject({ name: 'cat' })).toBe(true);

    // null is technically typeof "object" in JS -- a famous bug!
    // isObject protects you from that
    expect(isObject(null)).toBe(false);
  });

  test('isPromise -- "Is it something that will finish later?"', () => {
    // A Promise is like ordering food -- you get it later
    const orderPizza = Promise.resolve('pizza');
    expect(isPromise(orderPizza)).toBe(true);

    // A plain object is not a promise
    expect(isPromise({ then: 'not a function' })).toBe(false);
  });
});

// ─────────────────────────────────────────────────
//  2.  withoutKey -- "Take one sticker off the toy"
// ─────────────────────────────────────────────────
//
//  You have a toy with stickers on it.
//  `withoutKey` peels off ONE sticker
//  and gives you back the toy.

describe('withoutKey -- "Remove one thing"', () => {
  test('remove "age" from a cat', () => {
    const cat = { name: 'Mochi', color: 'white', age: 3 };

    // Peel off the "age" sticker
    const catWithoutAge = withoutKey(cat, 'age');

    // Only name and color are left
    expect(catWithoutAge).toEqual({ name: 'Mochi', color: 'white' });
  });
});

// ─────────────────────────────────────────────────
//  3.  useEnum -- "A menu you can only pick from"
// ─────────────────────────────────────────────────
//
//  An enum is like a menu at a restaurant.
//  You can ONLY order what is on the menu.
//
//  enum IceCreamFlavor {
//    vanilla  = 'vanilla',     <-- key: vanilla,  value: 'vanilla'
//    choco    = 'chocolate',   <-- key: choco,    value: 'chocolate'
//  }
//
//  The KEY is what is written on the LEFT.
//  The VALUE is what is written on the RIGHT.
//  Sometimes they look the same, sometimes not!

describe('useEnum -- "What is on the menu?"', () => {
  enum IceCreamFlavor {
    vanilla = 'vanilla',
    choco = 'chocolate',
    strawberry = 'strawberry',
  }

  const menu = useEnum(IceCreamFlavor);

  test('keys -- "What names are on the LEFT side of the menu?"', () => {
    expect(menu.keys).toEqual(['vanilla', 'choco', 'strawberry']);
  });

  test('values -- "What names are on the RIGHT side of the menu?"', () => {
    expect(menu.values).toEqual(['vanilla', 'chocolate', 'strawberry']);
  });

  test('hasKey -- "Is this a valid menu label?"', () => {
    // "choco" is a key on the left side
    expect(menu.hasKey('choco')).toBe(true);

    // "chocolate" is the value, not the key!
    expect(menu.hasKey('chocolate')).toBe(false);
  });

  test('hasValue -- "Can I actually order this flavor?"', () => {
    // "chocolate" is a real flavor you can order
    expect(menu.hasValue('chocolate')).toBe(true);

    // "choco" is just the short name, not the real flavor
    expect(menu.hasValue('choco')).toBe(false);
  });

  test('entries -- "Show me each label with its flavor"', () => {
    expect(menu.entries).toEqual([
      ['vanilla', 'vanilla'],
      ['choco', 'chocolate'],
      ['strawberry', 'strawberry'],
    ]);
  });
});

// ─────────────────────────────────────────────────
//  4.  isTSInterface -- "Does this toy match the picture on the box?"
// ─────────────────────────────────────────────────
//
//  The box says the toy should have:
//    - a name   (required)
//    - a color  (required)
//    - wheels   (optional -- it is ok if missing)
//
//  If the toy has EXTRA parts not on the box,
//  it does NOT match.

describe('isTSInterface -- "Does it match the shape?"', () => {
  interface Toy {
    name: string;
    color: string;
    wheels?: number;
  }

  const allKeys: (keyof Toy)[] = ['name', 'color', 'wheels'];
  const requiredKeys: (keyof Toy)[] = ['name', 'color'];

  test('a matching toy passes', () => {
    const car = { name: 'race car', color: 'red', wheels: 4 };
    expect(isTSInterface<Toy>(car, allKeys, requiredKeys)).toBe(true);
  });

  test('missing optional key is still fine', () => {
    const doll = { name: 'teddy', color: 'brown' };
    expect(isTSInterface<Toy>(doll, allKeys, requiredKeys)).toBe(true);
  });

  test('extra unknown parts -> does NOT match', () => {
    const weird = { name: 'blob', color: 'green', wings: 2 };
    expect(isTSInterface<Toy>(weird, allKeys, requiredKeys)).toBe(false);
  });

  test('missing required part -> does NOT match', () => {
    const broken = { name: 'mystery' };
    expect(isTSInterface<Toy>(broken, allKeys, requiredKeys)).toBe(false);
  });
});

// ─────────────────────────────────────────────────
//  5.  extend & set -- "Building with blank paper"
// ─────────────────────────────────────────────────
//
//  KEY IDEA:
//    "unknown & Something  becomes  Something"
//
//  `unknown` is a blank piece of paper.
//  If you glue a drawing of a cat onto blank paper,
//  you just get... a drawing of a cat.
//
//  `extend()` starts with blank paper (unknown)
//  and lets you glue types onto it one at a time.
//
//  `set()` starts with blank paper too,
//  but it lets you add or replace a single named property.

describe('extend & set -- "Glue things onto blank paper"', () => {
  test('unknown & { name: string } becomes { name: string }', () => {
    // Start with blank paper, glue on { name: string }
    //
    //   extend<unknown>()          <-- blank paper (unknown is the default)
    //     <{ name: string }>()     <-- glue { name: string }
    //
    //   unknown & { name: string } --> just { name: string }
    //
    const result = extend()<{ name: string }>();
    expectTypeOf(result).toEqualTypeOf<{ name: string }>();
  });

  test('unknown & { age: number } becomes { age: number }', () => {
    const result = extend()<{ age: number }>();
    expectTypeOf(result).toEqualTypeOf<{ age: number }>();
  });

  test('{ name: string } & { age: number } becomes { name: string; age: number }', () => {
    // This time we do NOT start from blank paper.
    // We start from { name: string } and glue on { age: number }.
    type WithName = { name: string };
    const result = extend<WithName>()<{ age: number }>();
    expectTypeOf(result).toEqualTypeOf<{ name: string; age: number }>();
  });

  test('set -- "Write a label on blank paper"', () => {
    // set() adds a single key-value label
    //
    //   set<unknown>()               <-- blank paper
    //     <'color', string>()        <-- write "color: string" on it
    //
    //   Omit<unknown, 'color'> & Record<'color', string>
    //   --> just { color: string }
    //
    const result = set()<'color', string>();
    expectTypeOf(result).toEqualTypeOf<{ color: string }>();
  });

  test('set replaces an existing key', () => {
    // If the paper already says "age: string",
    // set can cross it out and write "age: number" instead
    type Original = { name: string; age: string };
    const result = set<Original>()<'age', number>();
    expectTypeOf(result).toEqualTypeOf<{ name: string; age: number }>();
  });
});

// ─────────────────────────────────────────────────
//  6.  RenameKey / RenameKeys -- "Change the name tag"
// ─────────────────────────────────────────────────
//
//  Imagine your friend's name tag says "fullName".
//  You want it to just say "name".
//  RenameKey swaps the label, the person stays the same.

describe('RenameKey & RenameKeys -- "Swap the label"', () => {
  interface Pet {
    id: number;
    fullName: string;
  }

  test('RenameKey swaps one label', () => {
    // fullName -> name
    type Renamed = RenameKey<Pet, 'fullName', 'name'>;

    // "name" now exists and is still a string
    expectTypeOf<Renamed>().toHaveProperty('name').toEqualTypeOf<string>();
    // "id" is untouched
    expectTypeOf<Renamed>().toHaveProperty('id').toEqualTypeOf<number>();
  });

  test('RenameKeys swaps many labels at once', () => {
    interface BigPet {
      id: number;
      fullName: string;
      favFood: string;
    }

    // fullName -> name,  favFood -> food
    type Renamed = RenameKeys<BigPet, { fullName: 'name'; favFood: 'food' }>;

    expectTypeOf<Renamed>().toHaveProperty('name').toEqualTypeOf<string>();
    expectTypeOf<Renamed>().toHaveProperty('food').toEqualTypeOf<string>();
    expectTypeOf<Renamed>().toHaveProperty('id').toEqualTypeOf<number>();
  });
});

// ─────────────────────────────────────────────────
//  7.  UnreadableType -- "Flatten the origami"
// ─────────────────────────────────────────────────
//
//  Sometimes TypeScript shows a type as a messy
//  pile of `Omit<Pick<Partial<...>>>`.
//  You hover over it and get gibberish.
//
//  UnreadableType is like unfolding origami:
//  it flattens everything so you see the
//  final simple shape.
//
//  type Messy = Omit<{ a: string; b: number }, 'b'>
//  type Clean = UnreadableType<Messy>
//  //   ^?  { a: string }    <-- nice and flat!

describe('UnreadableType -- "Unfold the origami"', () => {
  test('flattens a messy intersection into a clean object', () => {
    // { a: string } & { b: number } is an intersection
    // your editor might show it as "{ a: string } & { b: number }"
    // UnreadableType flattens it to { a: string; b: number }
    type Messy = { a: string } & { b: number };
    type Clean = UnreadableType<Messy>;

    expectTypeOf<Clean>().toEqualTypeOf<{ a: string; b: number }>();
  });

  test('already-flat types stay the same', () => {
    type Simple = { x: number };
    type AlsoSimple = UnreadableType<Simple>;

    expectTypeOf<AlsoSimple>().toEqualTypeOf<{ x: number }>();
  });
});

// ─────────────────────────────────────────────────
//  CHEAT SHEET (copy-paste into your notes)
// ─────────────────────────────────────────────────
//
//  unknown              = blank paper, could be anything
//  unknown & T          = blank paper + T  -->  just T
//  data is string       = "after this check, treat data as string"
//  keyof T              = "the names of all properties in T"
//  T[keyof T]           = "the types of all values in T"
//  Omit<T, K>           = "T but without the property K"
//  Record<K, V>         = "an object where key K has value V"
//  T extends U ? A : B  = "if T fits inside U, then A, else B"
//  <T = unknown>        = "T is a blank by default, fill it in later"
//  (...args: any[]) => any = "literally any function"
