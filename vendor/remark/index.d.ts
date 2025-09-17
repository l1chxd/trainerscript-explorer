export interface ProcessResult {
  value: string;
  toString(): string;
}

export interface Processor {
  use(
    plugin: (options?: any) => ((input: string) => string | Promise<string>) | void,
    options?: any
  ): Processor;
  process(markdown: string): Promise<ProcessResult>;
}

export function remark(): Processor;
