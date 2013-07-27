var socket = io.connect('http://localhost');
socket.on('nodecopterData', function (data) {
	ractive.set(data);
});

var ractive = new Ractive({
  el: 'dataContainer',
  template: '#dataTemplate',
  data:{
  	flightDynamics:{
  		pitch:"Loading...",
  		roll:"Loading...",
  		yaw:"Loading..."
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
	}
})