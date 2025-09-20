export {
  isString,
  withoutKey,
  isArray,
  isFunction,
  isNumber,
  isBoolean,
  isNull,
  isUndefined,
  isObject,
  isPromise,
};

function isString(data: unknown): data is string {
  return typeof data === 'string';
}

function isArray(data: unknown): data is unknown[] {
  return Array.isArray(data);
}

function isFunction(data: unknown): data is (...args: any[]) => any {
  return typeof data === 'function';
}

function isNumber(data: unknown): data is number {
  return typeof data === 'number' && !isNaN(data);
}

function isBoolean(data: unknown): data is boolean {
  return typeof data === 'boolean';
}

function isNull(data: unknown): data is null {
  return data === null;
}

function isUndefined(data: unknown): data is undefined {
  return data === undefined;
}

function isObject(data: unknown): data is Record<string, unknown> {
  return data !== null && typeof data === 'object';
}

function isPromise<T = unknown>(data: unknown): data is Promise<T> {
  return (
    isObject(data) &&
    isFunction((data as any).then) &&
    isFunction((data as any).catch)
  );
}

// Objects
function withoutKey<T>(obj: Record<string, T>, key: string): Record<string, T> {
  const { [key]: _omit, ...rest } = obj;
  return rest;
}
