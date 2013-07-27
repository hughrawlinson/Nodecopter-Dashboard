var socket = io.connect('http://localhost');

setInterval(function(){socket.emit('getData', { function: "nothing" })},500);

socket.on('nodecopterData', function (data) {
	console.log(data);
	ractive.set(data);
});

var ractive = new Ractive({
  el: 'dataContainer',
  template: '#dataTemplate',
  data:{
  	droneState:{
  		english:"Loading...",
  		alertstate:"info",
  		batteryPercentage:"Loading..."
  	},
  	flightDynamics:{
  		pitch:"Loading...",
  		roll:"Loading...",
  		yaw:"Loading...",
  		altitude:"Loading..."
  	}
  }
});

$(".nodecopterCtrlBtn").click(function(){
	var dataFunction = $(this).attr("data-function");
	console.log(dataFunction);
	socket.emit('controlTrigger', { function: dataFunction });
});

$(document).keypress(function(d){
	switch(d.which){
		case 113:
			$('#q').trigger('click');
			break;
		case 119:
			$('#w').trigger('click');
			break;
		case 101:
			$('#e').trigger('click');
			break;
		case 97:
			$('#a').trigger('click');
			break;
		case 115:
			$('#s').trigger('click');
			break;
		case 100:
			$('#d').trigger('click');
			break;
		case 122:
			$('#z').trigger('click');
			break;
		case 120:
			$('#x').trigger('click');
			break;
		case 99:
			$('#c').trigger('click');
			break;
		case 32:
			$('#space').trigger('click');
			break;
		case 13:
			$('#enter').trigger('click');
			break;
	}
})

$(document).keyup(function(){
	console.log("keyup is working");
	$('#stop').trigger('click');
})