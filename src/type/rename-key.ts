export type { RenameKey, RenameKeys };

/**
 * Utility type to rename a key in a type or interface
 *
 * @typedef {RenameKey}
 * @template T
 * @template {keyof T} OldKey
 * @template {string} NewKey
 */
type RenameKey<T, OldKey extends keyof T, NewKey extends string> = Omit<
  T,
  OldKey
> & {
  [K in NewKey]: T[OldKey];
};

/**
 * Utility type to rename multiple keys in a type or interface
 *
 * @typedef {RenameKeys}
 * @template T
 * @template {Record<string, string>} Mapping
 */
type RenameKeys<T, Mapping extends Record<string, string>> = {
  [K in keyof T as K extends keyof Mapping ? Mapping[K] : K]: T[K];
};

// type User = { id: number; fullName: string };

// // Provide a map of old → new keys
// type RenamedUser = RenameKeys<User, { fullName: "name" }>;
