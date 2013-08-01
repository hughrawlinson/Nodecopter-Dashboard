var arDrone = require("ar-drone");
var drone = arDrone.createClient();

var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app,{log:false})
	, fs = require('fs');

require("dronestream").listen(app); 
app.listen(1025);

var toClientData;

var setToClientData = function(data){
	var alertstate;
	var english;
	if(data.droneState.flying){
		alertstate = "success";
		english = "flying";
	}
	else{
		alertstate = "info";
		english = "not flying";
	}
	toClientData = {
		'droneState':{
			'alertstate':alertstate,
			'english':english,
			'batteryPercentage':data.demo.batteryPercentage
		},
		'flightDynamics':{
			'pitch':data.demo.rotation.pitch,
			'roll':data.demo.rotation.roll,
			'yaw':data.demo.rotation.yaw,
			'altitude':data.demo.altitude,
		}
	};
	
}

// drone.config('general:navdata_demo', 'FALSE');
drone.on('navdata', setToClientData);

function handler (req, res) {
	var requestedFile = req.url.substring(1);
	if (requestedFile == ""||requestedFile[requestedFile.length-1]=="/"){
		requestedFile += "index.html";
	}
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

var timeout = 200;
var speed = 0.5;

io.sockets.on('connection', function (socket) {
	socket.on('controlTrigger', function (data) {
		switch(data.function){
			case "up":
				drone.up(speed);
				break;
			case "down":
				drone.down(speed);
				break;
			case "left":
				drone.left(speed);
				break;
			case "right":
				drone.right(speed);
				break;
			case "forth":
				drone.front(speed);
				break;
			case "back":
				drone.back(speed);
				break;
			case "rotateR":
				drone.clockwise(speed);
				break;
			case "rotateL":
				drone.counterClockwise(speed);
				break;
			case "takeoff":
				drone.takeoff();
				break;
			case "land":
				drone.land();
				break;
			case "stop":
				drone.stop();
				break;
		}
	});
	socket.on('getData',function(){
		if(toClientData != undefined && toClientData != null){
			socket.emit('nodecopterData',toClientData);
		}
	})
});
