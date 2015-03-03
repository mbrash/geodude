'use stric';
var lat, lon;
var name = "Mike"


var dataInfo 
var app = angular.module('mapChat', []);

app.controller('ChatCtrl', ['$http', '$scope',function($http, $scope) {
    var self = this;
    self.data = []
    self.newMsg = false










    // ----------------------- DERICKS SPACE --------------------
    var update = function(msg) {
        console.log("update")
        // console.log(msg)
        self.data = msg
        console.log("below")
        console.log(msg)

    }

    // var getData = function() {
    //     setTimeout(function () {
    //         $http.get('/api/chats.json').success(function(data){
    //             // self.data = data
    //             self.data = dataInfo
    //             console.log("below me")
    //             console.log(self.data)
    //         }).error(function(data){})      
    //         getData();
    //         self.data = dataInfo
    //         self.data = [{content: "Sent from client", author: "Fuckface"}]
    //         // console.log(self.data)
    //     }, 2500);
    // };
    // getData()




    var socket = io('http://localhost:3000');
        var msgs 
        socket.on("33602", function(msg) {
            console.log("gots")
            dataInfo = msg
            self.data = msg
            $scope.$digest();
            // update(msg)
            // self.data = msg
            // console.log(self.data.length + " rs")
        })

     
        console.log("it ran tho")
        socket.on('connect', function(){
            socket.emit("join", {"name":name, "lon":lon, "lat":lat});

            console.log("Client Connected")            
            

        // CURRENT ISSUE, CALLED BEFORE LAT AND LONG, IF WRAPPED OUT OF SCOPE
        socket.on("pins", function(pins){
            console.log("A new user has joined the region")
            console.log(pins)
            for (var x in pins) {
                console.log(pins[x].lat)
                placePerson(pins[x].lat, pins[x].lon, pins[x].name)

            }
        })
   
        });











































// ----------------------- MIKES SPACE --------------------

    self.sendMsg = function() {
        // add new message to array
        var newMsg = {"content":self.newMessage, "author": "You"};
        socket.emit("33602", newMsg);
        console.log(self.data)

        // push message to database
        // $http.post('/api/chats.json', newMsg).success(function(data){
        // }).error(function(){})
        
        // clear out old message
        self.newMessage = ""
    }
}])


    
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});














L.mapbox.accessToken = 'pk.eyJ1IjoibWJyYXNoIiwiYSI6IjlQNWZIUUUifQ.xNcL13PeWvMEAqslBpGBOw';
var map

// generate map
var generateMap = function(lat, lon) {
        map = L.mapbox.map('map', 'examples.map-i86nkdio')
            .setView([lat, lon], 15);

        // place user
        // placePerson(lat, lon, "You", "#A33")
        // placePerson(lat + .005, lon + .005, "Derick")
        // placePerson(lat - .002, lon - .0025, "Mariah")
    } // end generateMap


// generate marker for user
var placePerson = function(lat, lon, name, color) {
    var color = color || "#33A";

    // add marker for user
    L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [lon, lat]
        },
        properties: {
            title: name,
            'marker-size': 'medium',
            'marker-color': color,
            'marker-symbol': 'circle'
        }
    }).addTo(map);
}












// // get lat and long
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(pos) {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        generateMap(pos.coords.latitude, pos.coords.longitude)
        
    });
} else {
    window.alert('Please enable geolocation and refresh page.')
}




// map box api
// L.mapbox.accessToken = 'pk.eyJ1IjoibWJyYXNoIiwiYSI6IjlQNWZIUUUifQ.xNcL13PeWvMEAqslBpGBOw';
// var map

// // generate map
// var generateMap = function(lat, lon) {
//     map = L.mapbox.map('map', 'examples.map-i86nkdio')
//     .setView([lat, lon], 15);

//     // place user
//     placePerson(lat, lon, "You", "#A33")
//     placePerson(lat+.005, lon+.005, "Derick")
//     placePerson(lat-.002, lon-.0025, "Mariah")
// } // end generateMap


// // generate marker for user
// var placePerson = function(lat, lon, name, color) {
//  var color = color || "#33A";

//  // add marker for user
//      L.mapbox.featureLayer({
//      type: 'Feature',
//      geometry: {
//          type: 'Point',
//              coordinates: [lon, lat]
//      },
//      properties: {
//          title: name,
//              'marker-size': 'medium',
//          'marker-color': color,
//          'marker-symbol': 'circle'
//      }
//  }).addTo(map);
// }


// // // get lat and long
// if ("geolocation" in navigator) {
//  navigator.geolocation.getCurrentPosition(function(pos) {
//              generateMap(pos.coords.latitude, pos.coords.longitude)
//          });
// } else {
//  window.alert('Please enable geolocation and refresh page.')
// }