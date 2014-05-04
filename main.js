var fs = require('fs');
var imageUpload = require('./imageUpload');
var parseString = require('xml2js').parseString;

exports.getImages = function(req, res, next) {
    console.log('empty data:');
};

exports.addImage = function(req, res, next) {
    var file = req.files.file,
        filePath = file.path,
        image = req.body;

    var lastIndex = filePath.replace('\\', '/').lastIndexOf('/');
    var tmpFileName = filePath.substr(lastIndex + 1);

    var albumId = req.body.albumId; //"5965097735673433505"
    var description = req.body.description;
    var token = req.body.token;
    var userId = req.body.userId;

    //console.log("upload: tmpFileName", tmpFileName);
    //console.log("upload: image.fileName", image.fileName);
    //console.log("upload: image", image);
    console.log("upload: tmpFileName", tmpFileName);
    console.log("upload: filePath", filePath);
    console.log("upload: file", file);

    image.fileName = tmpFileName;
    imageUpload.upload(filePath, {albumId: albumId, userId: userId, token: token}, function(error, response, body) {

        console.log('Return from Upload error', error);
        //console.log('Return from Upload Response', response);
        console.log('Return from Upload Body', body);

        if (body && (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 202)) {
            parseString(body, function (err, result) {
                if (!err) {
                    res.json(result);
                    console.log(result.entry['media:group'][0]['media:content'][0].$.url);
                }
                else {
                    var error = {
                        statusCode: 0,
                        message: err
                    };
                    res.json(error);
                    console.error('Error', error);
                }
            });
        }
        else {
            var statusCode = 0;
            if (response) {
                statusCode = response.statusCode;
            }

            var error = {
                statusCode: statusCode,
                message: body
            };
            // should return with error code
            res.json(error);
            console.error('Error', error);
        }

    });
};

