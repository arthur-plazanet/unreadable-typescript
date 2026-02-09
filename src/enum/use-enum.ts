/**
 * Enum is not a TypeScript type extension of JavaScript
 * They are real object at runtime - reverse mapping is also doable:
 * https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
 *
 * ps: in the TypeScript handbook, it seems that Objects with `const` are sufficient compared to Enum
 * https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums
 *
 * At compile time, the `keyof` keytword works differently than regular objects, and `keyof typeof`should be used to get a Type from enum
 *
 * @template {object} T
 * @param {T} enumObject
 * @returns {{
 *   readonly keys: Array<keyof T>;
 *   readonly values: Array<T[keyof T]>;
 *   readonly entries: Array<[keyof T, T[keyof T]]>;
 *   hasKey: (key: unknown) => key is keyof T;
 *   hasValue: (value: unknown) => value is T[keyof T];
 * }}
 */
export function useEnum<T extends object>(
  enumObject: T
): {
  readonly keys: Array<keyof T>;
  readonly values: Array<T[keyof T]>;
  readonly entries: Array<[keyof T, T[keyof T]]>;
  hasKey: (key: unknown) => key is keyof T;
  hasValue: (value: unknown) => value is T[keyof T];
} {

  return {
    get keys(): Array<keyof T> {
      const keys = Object.keys(enumObject) as Array<keyof T>;
      return keys;
    },

    get values(): Array<T[keyof T]> {
      const values = Object.values(enumObject) as Array<T[keyof T]>;
      return values;
    },

    get entries(): Array<[keyof T, T[keyof T]]> {
      const entries = Object.entries(enumObject) as Array<
        [keyof T, T[keyof T]]
      >;
      return entries;
    },

    hasKey(key: unknown): key is keyof T {
      return this.keys.includes(key as keyof T);
    },

    hasValue(value: unknown): value is T[keyof T] {
      return this.values.includes(value as T[keyof T]);
    },
  };
}
