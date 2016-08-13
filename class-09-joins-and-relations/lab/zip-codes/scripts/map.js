function initMap(result) {

  var map;
  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.

  if (result) {

    // Create a new map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      scrollwheel: true,
      zoom: 8
    });

    result.forEach(function(location) {
      var marker = new google.maps.Marker({
        position: {lat: location.latitude, lng: location.longitude},
        map: map,
        animation: google.maps.Animation.DROP,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });
      // center the map on the new location
      map.setCenter(marker.getPosition());
      // show info about each pin on click
      showInfo(result, marker, location);
    });
  } else {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.611435, lng: -122.330456},
      scrollwheel: true,
      zoom: 8
    });
  };
}

function showInfo(result, marker, location) {
  var contentString = '<div>' +
                      '<h3>City: ' + location.city + '</h3>' +
                      '<p>Zip: ' + location.zip + '</p>' +
                      '<p>Population in this zip code: ' + location.population + '</p>' +
                      '<p>Latitude: ' + location.latitude + '</p>' +
                      '<p>Longitude: ' + location.longitude + '</p>' +
                      '</div>';

  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}
