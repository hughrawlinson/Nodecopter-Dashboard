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
var stop = function(){
	drone.stop();
}

io.sockets.on('connection', function (socket) {
	socket.on('controlTrigger', function (data) {
		switch(data.function){
			case "up":
				drone.up(speed);
				setTimeout(stop,timeout);
				break;
			case "down":
				drone.down(speed);
				setTimeout(stop,timeout);
				break;
			case "left":
				drone.left(speed);
				setTimeout(stop,timeout);
				break;
			case "right":
				drone.right(speed);
				setTimeout(stop,timeout);
				break;
			case "forth":
				drone.front(speed);
				setTimeout(stop,timeout);
				break;
			case "back":
				drone.back(speed);
				setTimeout(stop,timeout);
				break;
			case "rotateR":
				drone.clockwise(speed);
				setTimeout(stop,timeout);
				break;
			case "rotateL":
				drone.counterClockwise(speed);
				setTimeout(stop,timeout);
				break;
			case "takeoff":
				drone.takeoff();
				break;
			case "land":
				drone.land();
				break;
		}
	});
	socket.on('getData',function(){
		if(toClientData != undefined && toClientData != null){
			socket.emit('nodecopterData',toClientData);
		}
	})
});
