var express = require('express');
var app = express();

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use('/lib', express.static(__dirname + '/bower_components'));
	app.use(express.bodyParser());
});

var port = 8002;
app.listen(port);
console.log("Server started on http://localhost:" + port);
