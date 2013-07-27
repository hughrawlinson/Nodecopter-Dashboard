require("ar-drone");

var drone = arDrone.createClient();

var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, fs = require('fs')

app.listen(1025);

var toClientData = {};

var setToClientData = function(data){
	toClientData = data;
}

drone.on('navdata', setToClientData);

function handler (req, res) {
	var requestedFile = req.url.substring(1);
	if (requestedFile == ""||requestedFile[requestedFile.length-1]=="/"){
		requestedFile += "index.html";
	}
	console.log(requestedFile);
	fs.readFile("webroot/"+requestedFile,function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.write(data);
		res.end();
	});
}

io.sockets.on('connection', function (socket) {
	socket.on('controlTrigger', function (data) {
		console.log(data);
	});
	setInterval(socket.emit('nodecopterData',toClientData),500);
});