#!/usr/bin/env node
'use strict';
/**
 * Require dependencies
 *
 */
const program = require('commander');
const chalk = require('chalk');
const exec = require('child_process').exec;
const pkg = require('./package.json');
const { sort } = require('./sortr.js');
/**
 * list function definition
 *
 */
let list = (directory, options) => {
  const cmd = 'ls';
  let params = [];

  if (options.all) params.push('a');
  if (options.long) params.push('l');
  let parameterizedCommand = params.length ? cmd + ' -' + params.join('') : cmd;
  if (directory) parameterizedCommand += ' ' + directory;

  let output = (error, stdout, stderr) => {
    if (error) console.log(chalk.red.bold.underline('exec error:') + error);
    if (stdout) console.log(chalk.green.bold.underline('Result:') + stdout);
    if (stderr) console.log(chalk.red('Error: ') + stderr);
  };

  exec(parameterizedCommand, output);
};

program
  .version(pkg.version)
  .command('list [directory]')
  .option('-a, --all', 'List all')
  .option('-l, --long', 'Long list format')
  .action(sort);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();
