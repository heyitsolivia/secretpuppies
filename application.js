$(document).ready(function() {
    $.getJSON("puppies.json", playPuppies)
});

function playPuppies(puppies) {
    var lastPuppy;
    var keycodes = {
        spacebar: 32,
        left_arrow: 37,
        right_arrow: 39
    }

    function pickUpPuppy() {
      var puppyCount = puppies.length;
      return puppies[Math.floor(Math.random() * puppyCount)];
    }


    function newPuppy() {
        var newPup = pickUpPuppy();
        while (lastPuppy == newPup) {
            var newPup = pickUpPuppy();
        }

        lastPuppy = newPup;
        return newPup;
    }

    function makeURL(newPup) {
        return 'http://i.imgur.com/' + newPup + '.mp4';
    }

    function loadPuppy(newPup) {
        var url = makeURL(newPup);
        $('#puppy > source').attr('src', url);
        $('.permalink a').attr('href', url);
        $('#puppy').load();
        history.pushState({pup: newPup}, '', '#' + newPup);
    }

    $(document).keyup(function(evt) {
        if (evt.keyCode == keycodes.spacebar || evt.keyCode == keycodes.right_arrow) { // right arrow should probably go forward, but not sure how to know we're at the end of the history stack
            var newPup = newPuppy();
            loadPuppy(newPup);
        } else if (evt.keyCode == keycodes.left_arrow) {
            history.back();
        }
    });

    window.addEventListener('popstate', function(e) {
        loadPuppy(e.state.pup);
    })

    var initial_pup = window.location.hash.substring(1);
    if (puppies.indexOf(initial_pup) == -1) {
        initial_pup = newPuppy();
    }
    loadPuppy(initial_pup);
}
