export { isTSInterface };

/*
 * How to tell if an object conforms to a Typescript interface
 * https://medium.com/developer-rants/follow-up-how-to-tell-if-an-object-conforms-to-a-typescript-interface-f99b4b77d602
 */
function isTSInterface<T>(
  value: any,
  keys: (keyof T)[],
  requiredKeys: (keyof T)[]
): value is T {
  if (typeof value !== 'object' || value === null) return false;

  return (
    requiredKeys.every((key) => key in value) && //  Ensure all required keys are present
    (Object.keys(value) as (keyof T)[]).every((key) => keys.includes(key)) //  Ensure no undefined keys are present
  );
}
