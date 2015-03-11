angular.module('gedodude')
	.controller('LoginCtrl', ['$location', function($location){
		var self = this;
		self.name = ""

		self.submit = function () {
			$location.path("/main")		
		}
	}])
