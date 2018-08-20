const fs = require('fs');
const os = require('os');
const path = require('path');

//sortr code
const sortOptions = ['music', 'videos', 'pictures', 'documents'];
const fileTypeOptions = ['music', 'video', 'picture', 'document'];
const Home = os.homedir();
//folders to sort to
const folders = {
  sortOptions: {
    music: `${Home}/Music`,
    video: `${Home}/Videos`,
    picture: `${Home}/Pictures`,
    document: `${Home}/Documents`
  },
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
  // console.log(directory);
  sortOptions.forEach(option => {
    if (options[option]) {
      params.push(option);
    }
  });

  const files = walk(directory);

  files.forEach(file => {
    const fileType = findType(file);
    if (params.indexOf(fileType) > -1) {
      rename(file, fileType);
      // console.log(file);
    }
  });
}
function rename(file, fileType) {
  console.log(file)
  fileTypeOptions.forEach(option => {
      fs.rename(
        file,
        `${folders.sortOptions[option]}/${filename(file)}`,
        err => {
          if (err) throw err;
        }
      )
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
  const videos = ['mp4', 'webm', 'avi', 'flv', 'vob', 'mpg', 'mpeg'];
  const documents = ['pdf', 'epub', 'doc', 'ppt', 'txt', 'docx', 'epub'];
  const pictures = ['png', 'jpeg', 'jpg'];

  const fileExt = file
    .toString()
    .toLowerCase()
    .split('.')
    .pop();
  return music.indexOf(fileExt) > -1
    ? (filetype = 'music')
    : videos.indexOf(fileExt) > -1
      ? (filetype = 'videos')
      : documents.indexOf(fileExt) > -1
        ? (filetype = 'documents')
        : pictures.indexOf(fileExt) > -1
          ? (filetype = 'pictures')
          : documents.indexOf(fileExt) > -1
            ? (filetype = 'documents')
            : (filetype = 'unknown');

  return fileType;
}

module.exports = {
  sort
};
