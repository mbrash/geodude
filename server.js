var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/public'));

http.listen(3000, function() {
    console.log('listening on *:3000');
});



// server gets a new user who joins chat with: (name, zipcode, lat and lon)
// server then adds user to users array based on zipcode ie. user from 33602 --> user[33602].push(user)
// user is then assigned and ID number based on array index when pushed
// server then takes users id, name, lat and lon and ads them to the pins table based on zipcode
// ie. pins[33602].push(id, name, lat and lon) 
// the pins table are sent to all users on the zipcode
// the msgs for zipcode are sent to the user who just joined

// server limits messages stored to 100, if more the server removes the oldest message
// server has a 1000ms buffer for sending pins and messages

// when a user send a message the server collects messages and stores in array ie. msgs[33602].push(msg)
// messages from client have a content, name and id
// the id is used to highlight the pin who talked
// the messages table is then sent back to all clients on server

var users = [],
	pins  = [],
	msgs  = [],
	buffT = 300;

var buffer = function(data, channel, string) {
	setTimeout(function(){
		// console.log("Sent " + string + " to users in zipcode: " + channel)
		for (var x in users[channel]) {
			users[channel][x].emit(string, data[channel])
		}

		// check array for max length
		if (data[channel].length > 100) {
			data[channel].shift();
		}
	}, buffT);
}


io.on('connection', function(socket){
	// when user first joins
	socket.on("join", function(data){
		// current channel socket io
		var channel = data.zip;
		console.log(data.name+" joined :" + channel);
	
		// add user to user array, assign id
		users[channel] = users[channel] || [];
		console.log("Users in channel: " + channel + " = " + (users[channel].length+1))
		socket.user_id = users[channel].length;
		socket.channel = channel;
		users[channel].push(socket);

		// add user to pins array
		pins[channel] = pins[channel] || []
		pins[channel].push({
			"name": data.name,
			"lat": data.lat,
			"lon": data.lon,
			"id": socket.user_id
		});

		buffer(pins, channel, "pins")
		socket.emit("msg", msgs[channel])
	})

	// get message from client
	socket.on("msg", function(msg) {
    	var channel = msg.zip

    	// add msg to msgs array
    	msgs[channel] = msgs[channel] || []
    	msgs[channel].push(msg)
    	console.log("Messages in channel: " + channel + " = " + msgs[channel].length)

    	buffer(msgs, channel, "msg") 	
    });

	// when client disconnects, remove
    socket.on("disconnect", function() {
    	console.log("Removing user from: " + socket.channel)
    	console.log(users[socket.channel].indexOf(socket))
    	users[socket.channel].splice(users[socket.channel].indexOf(socket))
    	console.log("it worked")

    	// delting whola rray

    })
});
