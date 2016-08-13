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
      });
      map.setCenter(marker.getPosition());
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
