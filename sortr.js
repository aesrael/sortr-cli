var fs = require('fs');
var os = require('os');

//sortr code
var dirs=['Downloads','Music','Desktop','Videos','Pictures','Documents'];

//check if 'new' folders exist in each parent dir, else create 
for(var i=0; i<dirs.length; i++){
    if (!fs.existsSync(os.homedir() + '/' + dirs[i]  + '/' + 'new')){
        fs.mkdirSync(os.homedir() + '/' + dirs[i]  + '/' + 'new');
    }
}

 // fs.mkdirSync(os.homedir() + '/' + dirs[i]  + '/' + 'new');
 //folder to loop through
 var downloads = os.homedir() + '/' + 'Downloads/test';

 //folders to sort to
 var music = os.homedir() + '/' + 'Music' + '/' + 'new';
 var desktop = os.homedir() + '/' + 'Desktop' + '/' + 'new';
 var video = os.homedir() + '/' + 'Videos' + '/' + 'new';
 var pictures = os.homedir() + '/' + 'Pictures' + '/' + 'new';
 var documents = os.homedir() + '/' + 'Documents' + '/' + 'new';

fs.readdir(downloads, function (err, files) {
    if (err) throw err;

    //loop through the files array;
    files.forEach(function (file) {


        //sort mp3 files
        sort(['mp3', 'ogg', 'wav'], music);
        //sort video files
        sort(['mp4', 'avi', 'flv', 'vob', 'mpg', 'mpeg'], video);
        //sort books
        sort(['pdf', 'epub'], documents);
        //sort zip,gzip and rar files
        sort(['zip', 'gzip', 'rar'], documents);
        //sort apps
        sort(['dmg', 'exe'], documents);
        //sort pictures
        sort(['png', 'jpeg', 'jpg'], pictures);
        //sort documents
        sort(['doc', 'ppt'], documents);

        //Remove unfinished downloads
        unlink('.crdownload');

        // remove files
        function unlink(ext) {
            if (file.indexOf('.' + ext) != -1) {
                fs.unlink(downloads + '/' + file, function (err) {
                    console.log('faulty file removed')
                })
            }
        }

        // sort files
        function sort(extension, dir) {
            extension.map(function (ext) {


                if (file.indexOf('.' + ext) != -1) {
                    console.log(file + ' ' + 'found');

                    //rename paths
                    var oldpath = downloads + '/' + file;
                    var newpath = dir + '/' + file;

                    fs.rename(oldpath, newpath, function (err) {
                        if (err) throw err;

                    });

                }
            });
        }
    });
});


