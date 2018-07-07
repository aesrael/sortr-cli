const fs = require('fs');
const os = require('os');
const path = require('path');

//sortr code
const dirs = [
  'Downloads',
  'Music',
  'Desktop',
  'Videos',
  'Pictures',
  'Documents'
];

//folder to loop through
const downloads = os.homedir() + '/' + 'Downloads/test';

//folders to sort to
const music = `${os.homedir()}/Music/new`;
const desktop = `${os.homedir()}/Desktop/new`;
const video = `${os.homedir()}/Videos/new`;
const pictures = `${os.homedir()}/Pictures/new`;
const documents = `${os.homedir()}/Documents/new`;

//sort mp3 files
walk(downloads);
// sort(['mp3', 'ogg', 'wav'], music);
// //sort video files
// sort(['mp4', 'avi', 'flv', 'vob', 'mpg', 'mpeg'], video);
// //sort books
// sort(['pdf', 'epub'], documents);
// //sort zip,gzip and rar files
// sort(['zip', 'gzip', 'rar'], documents);
// //sort apps
// sort(['dmg', 'exe'], documents);
// //sort pictures
// sort(['png', 'jpeg', 'jpg'], pictures);
// //sort documents
// sort(['doc', 'ppt'], documents);

function walk(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.map(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walk(path.join(dir, file), filelist);
    } else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
}
function sort(dir) {
  const files = walk(dir);
  files.forEach(file => {
    console.log(file);
  });
}

sort(downloads);

module.exports = {
  sort
};


// /**
//  * list function definition
//  *
//  */
// let list = (directory, options) => {
//   const cmd = 'ls';
//   let params = [];

//   if (options.all) params.push('a');
//   if (options.long) params.push('l');
//   let parameterizedCommand = params.length ? cmd + ' -' + params.join('') : cmd;
//   if (directory) parameterizedCommand += ' ' + directory;

//   let output = (error, stdout, stderr) => {
//     if (error) console.log(chalk.red.bold.underline('exec error:') + error);
//     if (stdout) console.log(chalk.green.bold.underline('Result:') + stdout);
//     if (stderr) console.log(chalk.red('Error: ') + stderr);
//   };

//   exec(parameterizedCommand, output);
// };