type Invariant = (condition: unknown, message?: string) => asserts condition;

export const invariant: Invariant = (condition: unknown, msg?: string) => {
  if (!condition) {
    throw new Error(msg);
  }
};

export const runIfFn = <T>(value: T | ((...args: unknown[]) => T), ...args: unknown[]): T => {
  return typeof value === 'function' ? (value as (...args: unknown[]) => T)(...args) : value;
};
