export type ZodIssue = {
  path: Array<string | number>;
  message: string;
};

export class ZodError extends Error {
  issues: ZodIssue[];
  constructor(issues: ZodIssue[]);
}

export type SafeParseSuccess<T> = { success: true; data: T };
export type SafeParseError = { success: false; error: ZodError };
export type SafeParseReturnType<T> = SafeParseSuccess<T> | SafeParseError;

export class ZodType<T> {
  optional(): ZodType<T | undefined>;
  parse(value: unknown): T;
  safeParse(value: unknown): SafeParseReturnType<T>;
}

export class ZodString extends ZodType<string> {}
export class ZodArray<T> extends ZodType<T[]> {}
export class ZodObject<T> extends ZodType<T> {}
export class ZodOptional<T> extends ZodType<T | undefined> {}

export type ZodRawShape = Record<string, ZodType<any>>;

export const z: {
  string(): ZodString;
  array<T>(schema: ZodType<T>): ZodArray<T>;
  object<T extends ZodRawShape>(shape: T): ZodObject<{ [K in keyof T]: T[K] extends ZodType<infer R> ? R : never }>;
};

export type infer<T extends ZodType<any>> = T extends ZodType<infer R> ? R : never;
