(function(){
	// FUNCTION FOR SHUFFLING THE DECK
	//documentation for functionality in credits on github
	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue, randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
}())