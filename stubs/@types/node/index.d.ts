declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
    }
    interface Process {
      env: ProcessEnv;
      cwd(): string;
    }
  }

  var process: NodeJS.Process;
}
