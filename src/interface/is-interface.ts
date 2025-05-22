export { isTSInterface };

/*
 * How to tell if an object conforms to a Typescript interface
 * https://medium.com/developer-rants/follow-up-how-to-tell-if-an-object-conforms-to-a-typescript-interface-f99b4b77d602
 */
/**
 * @template T - The type of the interface
 * @param value - The value to check
 * @param keys - The keys of the interface
 * @param requiredKeys - The required keys
 * @returns true if the value is an object that conforms to the interface, false otherwise
 */
function isTSInterface<T>(
  value: unknown,
  keys: (keyof T)[],
  requiredKeys: (keyof T)[]
): value is T {
  if (typeof value !== "object" || value === null) return false;

  return (
    requiredKeys.every((key) => key in value) && //  Ensure all required keys are present
    (Object.keys(value) as (keyof T)[]).every((key) => keys.includes(key)) //  Ensure no undefined keys are present
  );
}
