const fs = require('fs');
const os = require('os');
const path = require('path');

//sortr code
const sortOptions = ['music', 'videos', 'pictures', 'documents'];
const Home = os.homedir();
//folders to sort to
const folders = {
  downloads: `${Home}/Downloads/test`,
  music: `${Home}/Music`,
  desktop: `${Home}/Desktop`,
  videos: `${Home}/Videos`,
  pictures: `${Home}/Pictures`,
  documents: `${Home}/Documents`
};

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

/**
 *
 * @param {*} directory
 * @param {*} options
 */

function sort(directory, options) {
  let params = [];

  const foldersKey = Object.keys(folders);
  foldersKey.forEach(folderKey => {
    const folder = folders[folderKey];
    if (directory == folderKey) {
      directory = folder;
    }
  });
  sortOptions.forEach(option => {
    if (options[option]) {
      params.push(option);
    }
  });

  let parametizedOptions = params.join('');
  console.log(parametizedOptions);
  const files = walk(directory);

  files.forEach(file => {
    filetype = findType(file);

    if (!params.length) {
      rename(file, fileType);
    }
  });
}
function rename(file, fileType) {
  sortOptions.forEach(option => {
    if (fileType === option) {
      return fs.rename(file, `${folders[option]}/${filename(file)}`, err => {
        if (err) throw err;
      });
    }
    return;
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
