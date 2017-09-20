var express = require('express');
var router = express.Router();

const   fs = require("fs"),
        path = require("path");

const p = "./public/vids";
let allFiles = [];

fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }

    // files hold both dirs & files
    // let's get files only
    
    allFiles = files.map(function (file) {
        return path.join(p, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile();
    });

    allFiles.splice(allFiles.indexOf('public/vids/index.js'), 1);

    allFilesHttp = allFiles.map( function(file) {
        return '<a href="http://sonny.tech/' +
        file.replace(/^(public\/)/,"") + '">' +
        file.replace(/^(public\/vids\/)/,"") + '</a><br >';
    });

    allFilesHttps = allFiles.map( function(file) {
        return '<a href="https://sonny.tech/' +
        file.replace(/^(public\/)/,"") + '">' +
        file.replace(/^(public\/vids\/)/,"") + '</a><br >';
    });

    allFilesHttp.push('<hr />');
    allFilesHttp.unshift('<h2>HTTP</h2>');
    allFilesHttps.unshift('<h2>HTTPS</h2>');

    allFiles = allFilesHttp.concat(allFilesHttps);

    // allFiles.splice(allFiles.indexOf('index.js'), 1);
});


router.get('/', function(req, res) {
  return res.send(allFiles.join(''));
});

module.exports = router;

