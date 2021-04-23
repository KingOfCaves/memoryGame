// DOM VARIABLES
const $table = document.querySelector('.table-top');
const $prompt = document.querySelector('.turns');
const $stars = document.querySelector('.rank');
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

let turns = 0;
let matchedCards = [];
let flippedCards = [];
let time = 0;
let timer = null;
let mismatch = null;
let rank = 3;

// FUNCTION FOR SHUFFLING THE DECK
//documentation for functionality in credits on github
const shuffle = (array) => {
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
};

const tableSetup = () => {
	matchedCards = [];
	const shuffled = shuffle(deck);
	const tableHTML = shuffled
		.map((item) =>
			[
				`<li class=card data-type="${item}">`,
				`	<span class="status ${pending}"></span>`,
				`	<span class="type flaticon-${item}"></span>`,
				'</li>'
			].join('\n')
		)
		.join('\n');

	$table.innerHTML = tableHTML;
};

const promptUpdate = () => {
	$prompt.textContent = turns;
};

// CHECKS FOR THE CHANGES IN TURNS AND CHANGES THE STAR RANK ACCORDINGLY
function rankCheck() {
	let difficuly = 16;
	if (turns >= difficuly) {
		rank = 2;
		$resultMessage.textContent = 'PRETTY GOOD AYY?';
		if (turns >= difficuly * 1.5) {
			rank = 1;
			$resultMessage.textContent = 'TRY AGAIN!';
		}
	} else {
		rank = 3;
		$resultMessage.textContent = '300 IQ PLAY!';
	}
	rankUpdate();
}

const rankUpdate = () => {
	const rankHTML = [];
	for (var i = 0; i < rank; i++) {
		rankHTML.push('<span class="flaticon-star-1"></span>');
	}

	$stars.innerHTML = rankHTML.join('\n');
};

const reset = () => {
	turns = 0;
	time = 0;
	rank = 3;
	$results.classList.remove('results--open');
	init();
};

const init = () => {
	tableSetup();
	rankUpdate();
	promptUpdate();
};

const victory = () => {
	$seconds.textContent = time;
	$results.classList.add('results--open');
	timer = null;
};

const matchCheck = (clickedCard) => {
	flippedCards.push(clickedCard);

	if (flippedCards.length === 2) {
		turns += 1;
		promptUpdate();
		rankCheck();

		if (flippedCards.every((card) => card.type === clickedCard.type)) {
			flippedCards.forEach((card) => {
				card.status.classList.replace(pending, right);
			});
			matchedCards = [...flippedCards, ...matchedCards];
			flippedCards = [];
		} else {
			flippedCards.forEach((card) => {
				card.status.classList.replace(pending, wrong);
			});

			mismatch = setTimeout(() => {
				flippedCards.forEach((card) => {
					card.status.classList.replace(wrong, pending);
					card.element.classList.remove('flip');
				});

				flippedCards = [];
				mismatch = null;
			}, 2000);
		}
	}

	if (matchedCards.length === deck.length) {
		victory();
	}
};

init();

// EVENT LISTENERS

$table.addEventListener('click', (e) => {
	if (!mismatch) {
		const { target } = e;
		if (target.classList.contains('card') && !target.classList.contains('flip')) {
			target.classList.add('flip');
			matchCheck({
				element: target,
				status: target.querySelector('.status'),
				type: target.dataset.type
			});
		}

		if (!timer) {
			timer = setInterval(() => time++, 1000);
		}
	}
});

$redoBtn.addEventListener('click', () => {
	reset();
});
