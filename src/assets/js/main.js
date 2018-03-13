// Create an array of all cards
let cards = document.querySelectorAll(".card");
cards = Array.from(cards);
let openCards = [];

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

// Close cards
function closeCards() {
	for (let i = 0; i < openCards.length; i++) {
		if (!openCards[i].classList.contains("matched")) {
			openCards[i].classList.remove("card-open", "card-show", "unmatched");
		}
	}
}


document.addEventListener("DOMContentLoaded", function() {
	newDeck();
	showCards();
});
