$( document ).ready(function() {

    var puppies = ['2m78jPG', 'pn1e9TO', 'MQCIwzT', 'udLK6FS', 'ZNem5o3', 'DS2IZ6K', 'aydRUz8', 'MVUdQYK', 'kLvno0p', 'QTAa2BV', 'wScLiVz'];
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
        $('#puppy > source').attr('src', newPuppy());
        // console.log($('#puppy > source').attr('src'));
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

});