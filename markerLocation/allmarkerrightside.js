
				// Note: This example requires that you consent to location sharing when
		// prompted by your browser. If you see the error "The Geolocation service
		// failed.", it means you probably did not give permission for the browser to
		// locate you.
		var map, infoWindow;

function initMap() {
  // Create the map.

		function initMap() {
			let pos = {
				lat: 0,
				lng: 0,
			};
			const mapOptions = {
				center: pos,
				zoom: 15,
				streetViewControl: false,
				styles: [{
					stylers: [{
							hue: "#00ff6f"
						},
						{
							saturation: -50
						}
					]
				}]
			}
const infoWindow = new google.maps.InfoWindow({
				content: document.getElementById('information')
			});
			
			
			const map = new google.maps.Map(document.getElementById('map'), mapOptions);

			
			
  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;
  var moreButton = document.getElementById('more');
  moreButton.onclick = function() {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  // Perform a nearby search.
  service.nearbySearch(
      {location:{lat:51.613310 , lng: -0.064740}, radius: 500, type: ['restaurant']},
      function(results, status, pagination) {
        if (status !== 'OK') return;

        createMarkers(results);
        moreButton.disabled = !pagination.hasNextPage;
        getNextPage = pagination.hasNextPage && function() {
          pagination.nextPage();
        };
      });


function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    var li = document.createElement('li');
    li.textContent = place.name;
    placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);

}
function createMarker(place){
			var placeloc = place.geometry.location;
			var marker = new google.maps.Marker({
				map: map,
				position : place.geometry.location
			});
		}

			// Try HTML5 geolocation.
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

					infoWindow.setPosition(pos);
					infoWindow.setContent('You are here');
					infoWindow.open(map);
					map.setCenter(pos);
					var image = 'Pinkflag.png';
					let marker = new google.maps.Marker({
						position: pos,
						icon: image,
						map: map
					});


				}, function() {
					handleLocationError(true, infoWindow, map.getCenter());
				});
			} else {
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, map.getCenter());
			}
		}

		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			infoWindow.setPosition(pos);
			infoWindow.setContent(browserHasGeolocation ?
				'Error: The Geolocation service failed.' :
				'Error: Your browser doesn\'t support geolocation.');
			infoWindow.open(map);
		}
      google.maps.event.addDomListener(window, 'load', initMap);
}

