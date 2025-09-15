declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
    }
    interface Process {
      env: ProcessEnv;
      cwd(): string;
      exitCode?: number;
    }
  }

  var process: NodeJS.Process;
}

declare module "path" {
  export function join(...segments: string[]): string;
  export function relative(from: string, to: string): string;
}

declare module "fs/promises" {
  export function readFile(path: string, options: { encoding: string } | string): Promise<string>;
}

declare module "process" {
  const process: NodeJS.Process;
  export = process;
}
