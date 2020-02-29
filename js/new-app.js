(function() {
	// DOM VARIABLES
	const $table = document.querySelector('.table-top');
	const $propmt = document.querySelector('.turns');
	const $stars = document.querySelector('.rank').children;
	const $redoBtn = document.querySelector('.redo');
	const $results = document.querySelector('.results');
	const $seconds = document.querySelector('.seconds');
	const $resultMessage = document.querySelector('.results__title');

	// ICONS FOR CHECKING
	const wrong = 'flaticon-cancel';
	const right = 'flaticon-check';
	const pending = 'flaticon-help-1';

	// DECK VALUES
	let deck = [
		'sunrise',
		'sunrise',
		'night',
		'night',
		'cloud',
		'cloud',
		'humidity',
		'humidity',
		'snowflake',
		'snowflake',
		'thunder',
		'thunder',
		'tornado',
		'tornado',
		'hailing',
		'hailing'
	];

	let turns;
	let matchedCards = [];
	let flippedCards = [];
	let victory = false;
	let time = 0;
	let timer;

	// FUNCTION FOR SHUFFLING THE DECK
	//documentation for functionality in credits on github
	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
})();
