angular.module('gedodude')
	.controller('MainCtrl', ['MapService', '$scope', function(MapService, $scope){
		var self = this;
		self.name = "Mike"
		self.zip = "33602"
		self.lon = 1234
		self.lat = 4321
		var socket 


		
	
		var startServer = function() {
			socket = io('http://localhost:3000');         
		
		

		// listener for incoming messages        
		  socket.on("msg", function(res) {
		  		self.msgs = res;
		      $scope.$digest(); // manualy trigger angular cycle
		  })

    	// on connect to server
     	socket.on('connect', function(){
          socket.emit("join", {
          		"name": self.name, 
          		"lon": self.lon, 
          		"lat": self.lat, 
          		"zip": self.zip
      		});
	            
          // send message
		  		self.sendMsg = function() {
		    		socket.emit('msg', {
		   					"content": self.newMessage,
		   					"author": self.name,
	    					"zip": self.zip
	    			});
		    };
    	});
     	}

     	// get user location and load map
		MapService.getGeoLocation(startServer);

	}])