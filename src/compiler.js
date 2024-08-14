#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
require('node:child_process');
const { minify } = require('terser');
const { exec } = require('node:child_process');
const os = require('os');

const isWindows = os.platform() === 'win32';
if (isWindows) {
  console.error('This script is not supported on Windows! Please use git bash or WSL instead.');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: jsc <path-to-js-file> -o <output-file>');
  process.exit(1);
}

const jsFilePath = path.resolve(args[0]);
const outputFilePath = path.resolve(args[1]);

async function processJsFile() {
  const jsCode = fs.readFileSync(jsFilePath, 'utf-8');
  const shebang = '#!/usr/bin/env node\n';
  const tag = '/* JSC Compiler */';
  const compiledCode = await minify(jsCode);

  if (compiledCode.code) {
    const finalCode = shebang + tag + compiledCode.code + tag;
    fs.writeFileSync(outputFilePath, finalCode);
    exec(`chmod +x ${outputFilePath}`);
    console.log('JavaScript file compiled successfully!');
  } else {
    console.error('Error compiling JavaScript code!');
  }
}

processJsFile().catch(_ => {
  console.error('Error compiling JavaScript file!');
});