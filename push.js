var UrbanAirshipPush = require('urban-airship-push');


// Your app access configuration. You will find this stuff in your App
// Settings under App Key, App Secret and App Master Secret.
var config = {
    key: process.env.UrbanAirship_key,
    secret: process.env.UrbanAirship_secret,
    masterSecret: process.env.UrbanAirship_masterSecret
};

// Create a push object
var urbanAirshipPush = new UrbanAirshipPush(config);

console.log(config);

exports.push = function(req, res, next) {
    console.log(req.body);

    var blogid = req.body.blogid;
    var message = req.body.message;

    var pushInfo = req.body;

    urbanAirshipPush.push.validate(pushInfo, function (err, data) {
        if (err) {
            console.error('Validate Error', err);
            res.json({
                error: err
            });
            return;
        }

        console.log('Validate', data);

        urbanAirshipPush.push.send(pushInfo, function (err, data) {
            if (err) {
                console.error('Send Error', err);
                res.json({
                    error: err
                });
                return;
            }

            console.log('Send Data', data);
            res.json(data);
        });
    });
};

exports.pushJson = function(req, res, next) {
    console.log(req.body);
    //console.log('PUSH', blogid, message);

    res.json({
        blogid: blogid,
        message: message
    });
};