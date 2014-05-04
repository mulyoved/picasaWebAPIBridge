var fs = require('fs');
var request = require('request');

exports.upload = function(fileName, options, callback) {
    console.log('Going to read file', fileName);
    fs.readFile(fileName,function(error,data) {
        if (error) {
            console.log('Failed to read file', fileName);
            callback(error, null, null);
        }
        else {

            var token = options.token;
            var userId = options.userId || 'default';
            var rootUrl = 'https://picasaweb.google.com/data/feed/api/user/'+userId+'/albumid/'+options.albumId+'';

            console.log('Read file', data.length);
            console.log('Send Image to Google', rootUrl);

            request({
                method:'POST',
                headers:{ 
                    'GData-Version': '2',
                    'Authorization':'Bearer' + ' ' + token,
                    "Content-Type":'image/jpeg',
                    //'Content-Length':data.length,
                    "MIME-version":"1.0"},
                body:data,
                uri:rootUrl
            },callback);
        }
    });   
};
