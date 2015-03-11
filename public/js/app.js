// app.js
'use stric';

angular.module('gedodude', ["ngRoute"])
    .config(['$routeProvider', function($routeProvider){

        $routeProvider.when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .when('/main', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .otherwise({redirectTo: '/login'})
    }]);
















// var lat, lon;
// var name = "Mike"


// var dataInfo 




// app.controller('ChatCtrl', ['$http', '$scope',function($http, $scope) {
//     var self = this;
//     self.data = []
//     self.newMsg = false










//     // ----------------------- DERICKS SPACE --------------------
//     var update = function(msg) {
//         console.log("update")
//         // console.log(msg)
//         self.data = msg
//         console.log("below")
//         console.log(msg)

//     }

//     // var getData = function() {
//     //     setTimeout(function () {
//     //         $http.get('/api/chats.json').success(function(data){
//     //             // self.data = data
//     //             self.data = dataInfo
//     //             console.log("below me")
//     //             console.log(self.data)
//     //         }).error(function(data){})      
//     //         getData();
//     //         self.data = dataInfo
//     //         self.data = [{content: "Sent from client", author: "Fuckface"}]
//     //         // console.log(self.data)
//     //     }, 2500);
//     // };
//     // getData()









//     var socket = io('http://localhost:3000');
//         var msgs 

        
//         socket.on("msg", function(msg) {
//             console.log("gots")
//             dataInfo = msg
//             self.data = msg
//             $scope.$digest();
//             // update(msg)
//             // self.data = msg
//             // console.log(self.data.length + " rs")
//         })

     
//         socket.on('connect', function(){
//             socket.emit("join", {"name":name, "lon":lon, "lat":lat, "zip":"33602"});
//             console.log("Client Connected")            
            

//         // CURRENT ISSUE, CALLED BEFORE LAT AND LONG, IF WRAPPED OUT OF SCOPE
//         socket.on("pins", function(pins){
//             console.log("A new user has joined the region")
//             console.log(pins)
//             for (var x in pins) {
//                 console.log(pins[x].lat)
//                 placePerson(pins[x].lat, pins[x].lon, pins[x].name)

//             }
//         })
   
//         });

// // ----------------------- MIKES SPACE --------------------

//     self.sendMsg = function() {
//         // add new message to array
//         var newMsg = {"content":self.newMessage, "author": "You", "zip":"33602"};
//         socket.emit("msg", newMsg);
//         console.log(self.data)

//         // push message to database
//         // $http.post('/api/chats.json', newMsg).success(function(data){
//         // }).error(function(){})
        
//         // clear out old message
//         self.newMessage = ""
//     }
// }])


    


















