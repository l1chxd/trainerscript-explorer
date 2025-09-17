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
  export function resolve(...segments: string[]): string;
  export function normalize(path: string): string;
  export function isAbsolute(path: string): boolean;
}

declare module "fs/promises" {
  export interface Dirent {
    name: string;
    isDirectory(): boolean;
    isFile(): boolean;
  }
  export function readFile(path: string, options: { encoding: string } | string): Promise<string>;
  export function readdir(path: string, options: { withFileTypes: true }): Promise<Dirent[]>;
}

declare module "process" {
  const process: NodeJS.Process;
  export = process;
}
