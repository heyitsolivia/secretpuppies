$(document).ready(function() {
    $.getJSON("puppies.json", playPuppies)
});

function playPuppies(puppies) {
    var puppies_seen = [];

    function pickUpPuppy() {
      var puppyCount = puppies.length;
      return puppies[Math.floor(Math.random() * puppyCount)];
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
        return 'http://i.imgur.com/' + newPup + '.mp4';

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
