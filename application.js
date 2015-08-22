$(document).ready(function() {
    $.getJSON("puppies.json", playPuppies)
});

function playPuppies(puppies) {
    var puppies_seen = [];
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

    function makeURL(newPup) {
        return 'https://i.imgur.com/' + newPup + '.mp4';
    }

    function newPuppy() {

        if (puppies_seen.length == puppies.length) {
            console.log("Ran out of puppies. What should I do?");
            var current_pup = puppies_seen[puppies_seen.length - 1];
            puppies_seen = [current_pup]; // for now reset but don't repeat what we have
        }

        var newPup = pickUpPuppy();

        while (puppies_seen.indexOf(newPup) != -1) {
            newPup = pickUpPuppy();
        }

        puppies_seen.push(newPup);
        return  newPup;

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
    })

    var initial_pup = window.location.hash.substring(1);
    if (puppies.indexOf(initial_pup) != -1) {
        initialPuppy(initial_pup);
    } else {
        initialPuppy(newPuppy());
    }
}
