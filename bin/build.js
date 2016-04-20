#!/usr/bin/env node
'use strict';

let exec = require('child_process').exec;
let packageJson = require(process.cwd() + '/package.json');

let files = `${packageJson.main} config.json node_modules/`

let excludes = Object.keys(packageJson.devDependencies)
  .map(name => `node_modules/${name}\\*`)
  .join(' ');

let command = [
  'rm -fr pkg',
  'mkdir pkg',
  `zip -r pkg/${packageJson.name}.zip ${files} -x ${excludes}`,
].join(';');

exec(command, (err, stdout, stderr) => {
  if (err) { console.log(err); }
  console.log(stdout);
  console.log(stderr);
});
