angular.module('gedodude')
	.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	});