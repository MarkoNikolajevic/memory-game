// Create an array of all cards
let cards = document.querySelectorAll(".card");
cards = Array.from(cards);

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

// Add click event on cards
function showCards() {
	cards.forEach(function(el) {
		el.addEventListener("click", function() {
			el.classList.add("card-open");
		});
	});
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

//  Match cards
const openedCards = [];

function cardsToMatch() {
	cards.forEach(function(el) {
		el.addEventListener("click", function() {
			openedCards.push(this);
			console.log(openedCards.length);
		});
	});
}


document.addEventListener("DOMContentLoaded", function() {
	newDeck();
	showCards();
	cardsToMatch();
});
