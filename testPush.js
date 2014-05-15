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

var pushInfo = {
    device_types: 'all-error',
    audience: 'all',
    notification: {
        alert: 'Blubb blub bla'
    }
};

urbanAirshipPush.push.validate(pushInfo, function (err, data) {
    if (err) {
        console.error('Validate Error', err);
        return;
    }

    console.log('Validate', data);
});

urbanAirshipPush.push.send(pushInfo, function (err, data) {
    if (err) {
        console.error('Send Error', err);
        return;
    }

    console.log('Send Data', data);
});