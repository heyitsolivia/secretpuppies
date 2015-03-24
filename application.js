var puppies = ['2m78jPG', 'pn1e9TO', 'MQCIwzT', 'udLK6FS', 'ZNem5o3', 'DS2IZ6K', 'aydRUz8', 'MVUdQYK', 'kLvno0p', 'QTAa2BV', 'wScLiVz'];

function pickUpPuppy() {
  var puppyCount = puppies.length;
  return puppies[Math.floor(Math.random() * puppyCount)];
}

function newPuppy() {
    return 'http://i.imgur.com/' + pickUpPuppy() + '.mp4';
}

$('#puppy > source').attr('src', newPuppy());
console.log($('#puppy > source').attr('src'));
$('#puppy').load();