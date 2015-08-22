$(document).ready(function() {
    $.getJSON("puppies.json", playPuppies)
});

function playPuppies(puppies) {
    var puppies_seen = [];
    var ask_about_adoption_after_x_puppies = 20;
    var keycodes = {
        spacebar: 32,
        left_arrow: 37,
        right_arrow: 39
    }

    function pickUpPuppy() {
      var puppyCount = puppies.length;
      return puppies[Math.floor(Math.random() * puppyCount)];
    }

    function makeURL(newPup) {
        return 'https://i.imgur.com/' + newPup + '.mp4';
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
        return  newPup;

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
    }

    function showPuppy(newPup) {
        var url = makeURL(newPup);
        $('#puppy > source').attr('src', url);
        $('.permalink').attr('href', url);
        $('#puppy').load();

    }

    function loadPuppy(pup) {
        showPuppy(pup)
        history.pushState({pup: pup}, '', '#' + pup);
    }

    function initialPuppy(pup) {
        showPuppy(pup);
        history.replaceState({pup: pup}, '', '#' + pup);
    }

    $(document).keyup(function(evt) {
        if (evt.keyCode == keycodes.spacebar) {
            var newPup = newPuppy();
            loadPuppy(newPup);
        } else if (evt.keyCode == keycodes.left_arrow) {
            history.back();
        } else if (evt.keyCode == keycodes.right_arrow) {
            history.forward();
        }
    });

    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.pup) {
            showPuppy(e.state.pup);
        }
    })

    var initial_pup = window.location.hash.substring(1);
    if (puppies.indexOf(initial_pup) != -1) {
        initialPuppy(initial_pup);
    } else {
        initialPuppy(newPuppy());
    }
}
