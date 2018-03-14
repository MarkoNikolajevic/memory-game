// Create an array of all cards
let cards = document.querySelectorAll(".card");
cards = Array.from(cards);
let openCards = [];
let moves = 0;
let sec = 0;
let min = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// Create new deck
const deck = document.querySelector(".card-board");
function newDeck() {
	let shuffCards = shuffle(cards);
	deck.innerHTML = "";
	shuffCards.forEach(function(el) {
		deck.append(el);
	});
}

// Show cards function
function showCards() {
	for (const card of cards) {
		card.addEventListener("click", function() {
			card.classList.add("card-open", "card-show");
			openCards.push(card);
			if (openCards.length === 2 && openCards[0].firstElementChild.getAttribute("data-icon") === openCards[1].firstElementChild.getAttribute("data-icon")) {
				matched();
				movesCounter();
				openCards = [];
			} else if (openCards.length === 2 && openCards[0].firstElementChild.getAttribute("data-icon") !== openCards[1].firstElementChild.getAttribute("data-icon")) {
				unmatched();
				setTimeout(function() {
					closeCards();
					openCards = [];
				}, 800);
				movesCounter();
			}
		});
	}
}

// Close cards
function closeCards() {
	for (let i = 0; i < openCards.length; i++) {
		if (!openCards[i].classList.contains("matched")) {
			openCards[i].classList.add("card-close");
			openCards[i].classList.remove("card-open", "card-show", "unmatched");
		}
	}
}

// Matched
function matched() {
	openCards[0].classList.remove("card-open");
	openCards[0].classList.add("matched", "disabled", "correct");
	openCards[1].classList.remove("card-open");
	openCards[1].classList.add("matched", "disabled", "correct");
}

// Unmatched
function unmatched() {
	openCards[0].classList.remove("card-open");
	openCards[0].classList.add("unmatched");
	openCards[1].classList.remove("card-open");
	openCards[1].classList.add("unmatched");
}

// Moves counter
function movesCounter() {
	moves++;
	document.querySelector(".moves").innerHTML = moves;
	const stars = document.querySelector(".stars");
	if (moves === 1) {
		gameTimer();
	}
	// Star rating
	else if (moves > 10 && moves < 13) {
		stars.removeChild(stars.lastElementChild);
	} else if (moves > 13 && stars.childNodes === 2) {
		stars.removeChild(stars.lastElementChild);
	}
}

//  Timer
const timer = document.querySelector(".timer");

function gameTimer() {
	setInterval(function() {
		timer.innerHTML = `${min} min ${sec} sec`;
		sec++;
		if (sec === 60) {
			min++;
			sec = 0;
		}
	}, 1000);
}


document.addEventListener("DOMContentLoaded", function() {
	newDeck();
	showCards();
});
