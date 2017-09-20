var express = require('express'),
    proxy = require('http-proxy-middleware'),
    //proxy = require('express-http-proxy'),
    httpProxy = require('http-proxy'),
    app = express(),
    path = require("path"),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    fs = require('fs'),
    port = parseInt(process.env.PORT, 10) || 8080;

app.disable('x-powered-by');


if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}
 
app.set('views', path.join(__dirname, '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, '/public'), {
  lastModified: false,
  eTag: false
}));

app.use('/todo', require('./todo'));


app.use('/vids', require('./public/vids'));


var transmission = proxy({
  target: 'http://localhost:9091',
  changeOrigin: true
});

app.use('/transmission', transmission);

//app.get('/transmission', function(req, res) {
//  apiProxy.web(req, res, {target: 'localhost:9091'});
//});


app.route('/').get(function(req,res){
  var str = fs.readFileSync('./public/index.html','utf-8');
  res.send(str);
});

app.listen(port, function() {
    console.log("Server listening at http://localhost:" + port);
  }
);

