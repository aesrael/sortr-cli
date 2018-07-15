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

//folders to sort to
const downloads = os.homedir() + '/' + 'Downloads/test';
const music = `${os.homedir()}/Music`;
const desktop = `${os.homedir()}/Desktop`;
const videos = `${os.homedir()}/Videos`;
const pictures = `${os.homedir()}/Pictures`;
const documents = `${os.homedir()}/Documents`;

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

function sort(directory, options) {
  let params = [];

  if (options.all) params.push(directory);
  if (options.music) params.push(music);
  if (options.videos) params.push(videos);
  if (options.pictures) params.push(pictures);
  if (options.books) params.push(documents);

  // let parametizedOptions = params.join('');

  const files = walk(directory);

  files.forEach(file => {
    filetype = findType(file);
    console.log(file);
    // if (params.length) {
    //   var folders = params.split(',');
    //   folders.forEach(folder => {
    //     if()
    //   });
    // }
    if (!params.length) {
      if (filetype === 'music') {
        fs.rename(file, `${music}/${filename(file)}`, err => {
          if (err) throw err;
        });
      }
      if (filetype === 'video') {
        fs.rename(file, `${videos}/${filename(file)}`, err => {
          if (err) throw err;
        });
      }

      if (filetype === 'document') {
        fs.rename(file, `${documents}/${filename(file)}`, err => {
          if (err) throw err;
        });
      }

      if (filetype === 'picture') {
        fs.rename(file, `${pictures}/${filename(file)}`, err => {
          if (err) throw err;
        });
      }
    }
  });
}

function filename(file) {
  return file
    .toString()
    .toLowerCase()
    .split('/')
    .pop();
}

function findType(file) {
  const music = ['mp3', 'ogg', 'wav'];
  const video = ['mp4', 'avi', 'flv', 'vob', 'mpg', 'mpeg'];
  const documents = ['pdf', 'epub', 'doc', 'ppt'];
  const pictures = ['png', 'jpeg', 'jpg'];

  const fileExt = file
    .toString()
    .toLowerCase()
    .split('.')
    .pop();
  return music.indexOf(fileExt) > -1
    ? (filetype = 'music')
    : video.indexOf(fileExt) > -1
      ? (filetype = 'video')
      : documents.indexOf(fileExt) > -1
        ? (filetype = 'document')
        : pictures.indexOf(fileExt) > -1
          ? (filetype = 'picture')
          : (filetype = 'unknown');

  return fileType;
}

module.exports = {
  sort
};
