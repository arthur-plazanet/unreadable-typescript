export { isString, withoutKey };

function isString(data: unknown): data is string {
  return typeof data === 'string';
}

function withoutKey<T>(obj: Record<string, T>, key: string): Record<string, T> {
  const { [key]: _omit, ...rest } = obj;
  return rest;
}
