#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');
const { createRequire } = require('module');

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Usage: node run-ts.cjs <path-to-ts-file>');
  process.exit(1);
}

const resolvedPath = path.isAbsolute(inputPath)
  ? inputPath
  : path.join(process.cwd(), inputPath);

let source;
try {
  source = fs.readFileSync(resolvedPath, 'utf8');
} catch (error) {
  console.error(`Unable to read ${resolvedPath}:`, error.message);
  process.exit(1);
}

const transpileResult = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
    resolveJsonModule: true,
  },
  fileName: resolvedPath,
  reportDiagnostics: true,
});

if (transpileResult.diagnostics && transpileResult.diagnostics.length > 0) {
  const formatHost = {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => process.cwd(),
    getNewLine: () => ts.sys.newLine,
  };
  const message = ts.formatDiagnostics(transpileResult.diagnostics, formatHost);
  console.error(message);
  process.exit(1);
}

const script = new vm.Script(transpileResult.outputText, {
  filename: resolvedPath,
});

const moduleScope = { exports: {} };
const sandbox = {
  require: createRequire(resolvedPath),
  module: moduleScope,
  exports: moduleScope.exports,
  __dirname: path.dirname(resolvedPath),
  __filename: resolvedPath,
  process,
  console,
  Buffer,
  setTimeout,
  setInterval,
  clearTimeout,
  clearInterval,
};

sandbox.global = sandbox;

try {
  script.runInNewContext(sandbox);
} catch (error) {
  console.error(`Error executing ${resolvedPath}:`);
  console.error(error);
  process.exitCode = 1;
}
