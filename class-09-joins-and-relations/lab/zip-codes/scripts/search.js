(function(module) {

  var filters = {};

  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  filters.filterByZip = function() {
    $('form').submit(function(event) {
      event.preventDefault();
      // get the input value from the form
      var $input = $('form :input').val();
      if (isNaN($input)) {
        alert('Please input a number.');
      } else {
        webDB.execute(
          'SELECT * FROM zips WHERE zip = "' + $input + '"',
          function(result) {
            if(result.length > 0) {
              initMap(result);
            } else {
              alert('There is no matching zipcode.');
            }
          }
        );
      }
    });
  };


  filters.populateStates = function() {
    webDB.execute(
      'SELECT DISTINCT state FROM zips ORDER BY state ASC',
      function(result) {
        result.forEach(function(item) {
          var state = item.state;
          var optionTag = '<option value="' + state + '">' + state + '</option>';
          $('#state-select').append(optionTag);
        });
      }
    );

    filters.populateCities = function() {
      $('#state-select').on('change', function() {
        var $state = $(this).val();
        $('#city-select option:first-child').siblings().remove();
        webDB.execute(
          'SELECT DISTINCT city FROM zips WHERE state = "' + $state + '" ORDER BY city ASC',
        function(result) {
          result.forEach(function(item) {
            var city = item.city;
            var optionTag = '<option value="' + city + '">' + city + '</option>';
            $('#city-select').append(optionTag);
          });
        }
        );
      });

    };

  // TODO: You will also interact with the map.js file here
    filters.dropPin = function() {
      $('#city-select').on('change', function() {
        var $state = $('#state-select').val();
        var $city = $(this).val();
        webDB.execute(
          'SELECT * FROM zips WHERE city = "' + $city + '" AND state = "' + $state + '"',
        function(result) {
          initMap(result);
        }
        );
      });
    };
  };

  module.filters = filters;

})(window);

filters.filterByZip();
filters.populateStates();
filters.populateCities();
filters.dropPin();
