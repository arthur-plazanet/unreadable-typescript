/**
 * Unknown means not known "until" defined. Which is better than any, because it forces you to define the type before using it.
 * Extend an object type, starting from `unknown` by default.
 * "unknown & Something becomes Something"
 */
export function extend<Base = unknown>() {
  return <Add>() => null as unknown as Base & Add;
}

/**
 * Replace (or add) a key on an object type, starting from `unknown`.
 */
export function set<Base = unknown>() {
  return <K extends PropertyKey, V>() =>
    null as unknown as Omit<Base, K> & Record<K, V>;
}
