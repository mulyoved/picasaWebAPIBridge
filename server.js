var express = require('express'),
    main = require('./main'),
    push = require('./push'),
    cors = require('cors'),
    app = express();

var methodOverride = require('method-override');
var morgan  = require('morgan');
var multer = require('multer');
var bodyParser = require('body-parser');


app.use(bodyParser());
app.use(cors());
app.options('*', cors()); // include before other routes
app.use(express.static(__dirname + '/public'));
app.use(morgan());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//app.use(express.json());
//app.use(express.urlencoded());
app.use(multer({
    dest: './uploads',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    }
}));

app.use(methodOverride());

app.post('/images', main.addImage); // endpoint to post new images
app.get('/images', main.getImages); // endpoint to get list of images
app.post('/push', push.push); // endpoint to get list of images

app.get('/', function(req, res){
    res.send('hello world');
});

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('PictureFeed server listening on port %d in %s mode', server.address().port, app.settings.env);
});
