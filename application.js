$( document ).ready(function() {

    var puppies = ['2m78jPG', 'pn1e9TO', 'MQCIwzT', 'udLK6FS', 'ZNem5o3', 'DS2IZ6K', 'aydRUz8', 'MVUdQYK', 'kLvno0p', 'QTAa2BV', 'wScLiVz', 'Z0TII8i', 'F1SChho', '9hRi2jN', 'lvzRF3W', 'fqHxOGI', '1xeUYme', '6tVqKyM', 'CCxZ6Wr', 'lMW0OPQ', 'wHVpHVG', 'Wj2PGRl', 'HlaTE8H', 'k5jALH0', '3V37Hqr', 'Eq2uMTA', 'Vy9JShx', 'g9I2ZmK', 'Nu4RH7f', 'sWp0Dqd', 'bRKfspn', 'qawCMl5', '2F6j2B4', 'MjtiJQX', 'fiJxCVA', 'pCAIlxD', 'zJx2skh', '9EPRfmC', '2Gdl1u7', 'aJJAY4c', 'ros6RLC', 'DKLBJh7', 'eyxH0Wc', 'rJEkEw4', 'Fawbxgh', 'bDYdPSV', 'Qnf8N', 'UdGqAqy', 'ZproAeR', 'O5mnnZa', 'B0Myq5r', 'Jh3QRKx', 'iwe1n1K', '4r6dbiO', 'PxInrJd', 'T6nEhIE', 'j8fxNyL'];
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