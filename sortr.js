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
const music = `${os.homedir()}/Music/`;
const desktop = `${os.homedir()}/Desktop/`;
const videos = `${os.homedir()}/Videos/`;
const pictures = `${os.homedir()}/Pictures/`;
const documents = `${os.homedir()}/Documents/`;

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

  // const files = walk(directory);
  // console.log(files);
  files.forEach(async file => {
    if (!params.length) {
      filetype = await findType(file);
      if (filetype === 'music') {
      }
      if (filetype === 'video') {
      }
      //find mimetype
      //sort into directory based on mimetypes using rename
      // sort all files here
    }
  });
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
