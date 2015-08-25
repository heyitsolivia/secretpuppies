$(document).ready(function() {
    $.getJSON("puppies.json", playPuppies);
});

function playPuppies(puppies) {
    var puppies_seen = [];
    var ask_about_adoption_after_x_puppies = 20;
    var keycodes = {
        spacebar: 32,
        left_arrow: 37,
        right_arrow: 39,
        k: 75
    }

    function pickUpPuppy() {
      var puppyCount = puppies.length;
      return puppies[Math.floor(Math.random() * puppyCount)];
    }

    function makeURL(newPup, extension) {
        return 'https://i.imgur.com/' + newPup + '.' + extension;
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
        var url;

        if (isMobileOrTablet()) {
            url = makeURL(newPup, 'gif');
            $('#puppygif').remove();
            setTimeout(function() {
                $('<img id="puppygif" class="centered" src="' + url + '">').insertAfter('#puppy');
            }, 500);
        } else {
            url = makeURL(newPup, 'mp4');
            $('#puppy > source').attr('src', url);
            $('#puppy').load();
        }

        $('.permalink').attr('href', url);
    }

    function loadNextPuppy() {
        var newPup = newPuppy();
        loadPuppy(newPup);
    }

    function loadPuppy(pup) {
        showPuppy(pup);
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
        } else if (evt.keyCode == keycodes.k) {
            $.getJSON('kittens.json', function(data) {
              puppies = data;
            });
        }
    });

    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.pup) {
            showPuppy(e.state.pup);
        }
    });

    if (isMobileOrTablet()) {
        $('#puppy').hide();
        $(document).on('click', loadNextPuppy);
    } else {
        $('#puppygif').hide();
    }

    var initial_pup = window.location.hash.substring(1);
    if (puppies.indexOf(initial_pup) != -1) {
        initialPuppy(initial_pup);
    } else {
        initialPuppy(newPuppy());
    }

    // http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    function isMobileOrTablet() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
}
