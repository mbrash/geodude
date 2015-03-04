angular.module('gedodude')
	.factory('MapService', [function(){
		var self = this;
		self.loc = {};

		// ---------------------------------------
		// get user lat and lon
		self.getGeoLocation = function(callback) {
			if ("geolocation" in navigator) {
    		navigator.geolocation.getCurrentPosition(function(pos) {
    			self.loc = {
    				"lat": pos.coords.latitude,
    				"lon": pos.coords.longitude
    			}
                callback()
        		self.createMap();
        });

			} else {
    		window.alert('Please enable geolocation and refresh page.');
			}

		}

		// ---------------------------------------
		// generate map with lat and lon
		self.createMap = function() {
			L.mapbox.accessToken = 'pk.eyJ1IjoibWJyYXNoIiwiYSI6IjlQNWZIUUUifQ.xNcL13PeWvMEAqslBpGBOw';

      self.map = L.mapbox.map('map', 'examples.map-i86nkdio')
            .setView([self.loc.lat, self.loc.lon], 15);


    };


    // ---------------------------------------
    // generate pin for user on map
		self.placePin = function(lat, lon, name, color) {
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
    }).addTo(self.map);
		};
		

		return self;
	}]);