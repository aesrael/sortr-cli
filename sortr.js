/**
 * Imports
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

/**
 * GLobal variables
 */
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

/**
 * Walks through supplied directory and returns the file tree
 *
 * @param dir {string} Directory to sort
 * @param filelist {array of files}
 * @return filelist {array} files in dir.
 */
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
 * Main function to sort files into dir
 *
 * @param directory {string} Directory to sort
 * @param options {cli flags} eg --music --videos
 *
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

  const files = walk(directory);

  files.forEach(file => {
    const fileType = findType(file);
    if (params.indexOf(fileType) > -1) {
      rename(file);
    }
  });
}

/**
 * Rename file to it's correct directory
 *
 * @param file {file} Directory to sort
 */
function rename(file) {
  console.log(file);
  fileTypeOptions.forEach(option => {
    fs.rename(file, `${folders.sortOptions[option]}/${filename(file)}`, err => {
      if (err) throw err;
    });
  });
}

/**
 * Gets the file name
 *
 * @param file {file path string} file string
 * @return file name.
 */
function filename(file) {
  return file
    .toString()
    .toLowerCase()
    .split('/')
    .pop();
}

/**
 * Gets the file extension
 *
 * @param file {file path string} file string
 * @return filetype
 */
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
