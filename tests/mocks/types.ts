export type { UnreadableType };

type UnreadableType<T> = T extends object
  ? { [K in keyof T]: UnreadableType<T[K]> }
  : T;
