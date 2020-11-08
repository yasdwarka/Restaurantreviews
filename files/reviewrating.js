var map, service;

function initMap() {
  var central_park = new google.maps.LatLng(40.764243, -73.973049);

  map = new google.maps.Map(document.getElementById("map"), {
    center: central_park,
    zoom: 15
  });

  var request = {
    location: central_park,
    radius: "500",
    types: ["restaurant"]
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, searchResult);
}

function searchResult(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    // show first result on map and request for details
    var place = results[0];
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });
    var infowindow = new google.maps.InfoWindow({
      content: place.name
    });
    infowindow.open(map, marker);

    service.getDetails({placeId: place.place_id}, function(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let rating = document.querySelector('#rating');
        let reviewEl = document.querySelector('.review-list');
        
        rating.innerHTML = place.rating;
        
        for (let review of place.reviews){
          let li = document.createElement('li');
          li.innerHTML = `<div>Author: ${review.author_name}</div>
                          <em>${review.text}</em>
                          <div>Rating: ${review.rating} star(s)</div>`;
          reviewEl.appendChild(li);
        }
      }
    });
  }
}
