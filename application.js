$(document).ready(function() {
    $.getJSON("puppies.json", playPuppies)
});

function playPuppies(puppies) {
    var puppies_seen = [];
    var ask_about_adoption_after_x_puppies = 20;

    function pickUpPuppy() {
      var puppyCount = puppies.length;
      return puppies[Math.floor(Math.random() * puppyCount)];
    }


    function newPuppy() {

        if (puppies_seen.length == ask_about_adoption_after_x_puppies) {
            askAboutAdoption();
        }

        var newPup = pickUpPuppy();

        while (puppies_seen.indexOf(newPup) != -1) {
            newPup = pickUpPuppy();
        }

        puppies_seen.push(newPup);
        return 'http://i.imgur.com/' + newPup + '.mp4';

    }

    function askAboutAdoption() {
        // var zipCode = getZipCode();
        document.getElementById("adoptionInfo").style.visibility = "visible";
        $("#location").focus();
        // $("#location").val(zipCode)
    }

    function getZipCode() {
        // Programatically get the user's ZIP code
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(
                    position.coords.latitude, position.coords.longitude)
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    var address_components = results[0].address_components
                    for (i = 0; i < address_components.length; i++) {
                        if (address_components[i].types.indexOf('postal_code') >= 0) {
                            return address_components[i].long_name;
                        }
                    }
                });
            });
        }
    }

    function loadPuppy() {
        var newPup = newPuppy();
        $('#puppy > source').attr('src', newPup);
        $('.permalink a').attr('href', newPup);
        // console.log($('#puppy > source').attr('src'));
        $('.permalink').load();
        $('#puppy').load();
    }

    function loadNewPuppy() {
        var spacebar = 32;

        $(document).keyup(function(evt) {
            if (evt.keyCode == spacebar) {
                loadPuppy();
            }
        });
    }

    loadPuppy();
    loadNewPuppy();
}
