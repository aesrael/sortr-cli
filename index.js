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

program
  .version(pkg.version)
  .command('sort [directory]')
  .option('-a, --all', 'Sort all files')
  .option('-m, --music', 'Sort Music files only')
  .option('-v, --videos', 'Sort videos only')
  .option('-b, --documents', 'sort books and documents only')
  .option('-d, --pictures', 'sort pictures only')
  .action(sort);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();
