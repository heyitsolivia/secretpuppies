$(document).ready(function() {
    $.getJSON("puppies.json", playPuppies)
});

function playPuppies(puppies) {
    var lastPuppy;

    function pickUpPuppy() {
      var puppyCount = puppies.length;
      return puppies[Math.floor(Math.random() * puppyCount)];
    }


    function newPuppy() {
        if (lastPuppy) {
            var newPup = pickUpPuppy();
            while (lastPuppy == newPup) {
                var newPup = pickUpPuppy();
            }

            lastPuppy = newPup;
            return 'http://i.imgur.com/' + newPup + '.mp4';
        } else {
            var pup = pickUpPuppy();

            lastPuppy = pup;
            return 'http://i.imgur.com/' + pup + '.mp4';
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
