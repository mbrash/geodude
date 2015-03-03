// var http = require('http');
// var express = require('express');
// var io = require('socket.io')(http);
// var app = express();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use('/', express.static(__dirname + '/public'));

// var server = app.listen(3000, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log('Listening at http://%s:%s', host, port)

// })


// io.on("connect", function () {
//     console.log("Connected!");
// });




var users = []
var pins = []
var msgs = []



// io.on("connection", function (socket) {
    
// });



io.on('connection', function(socket){
		// when user first joins
	socket.on("join", function(data){
		console.log(data.name+" joined the party!")
		console.log((users.length+1)+ " people party hard!")
		// add current client pin
		pins.push({
			"name": data.name,
			"lat": data.lat,
			"lon": data.lon
		})

		// send pins to users
		for (var x in users) {
			users[x].emit("pins", pins)
		}

		// add socket to users
		users.push(socket)
	})

	// get message from client
	socket.on("33602", function(msg) {
    	msgs.push(msg)
    	console.log("MSGS: "+msgs.length)

    	for (var x in users) {
    		users[x].emit("33602", msgs);
    	}    	
    })


    // remove on disconnect


});


// io.on("33602", function(msg) {
//     console.log(msg)
// })






http.listen(3000, function() {
    console.log('listening on *:3000');
});


// every 5000ms
// send a "ping" to mainChannel



// socket 



// rest function
// getUser()



// hey get current channel request