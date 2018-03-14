// Define variables
let cards = document.querySelectorAll(".card");
cards = Array.from(cards);
const deck = document.querySelector(".card-board");
let openCards = [];
const matchedCards = [];
const timer = document.querySelector(".timer");
let interval;
let moves = 0;
let sec = 0;
let min = 0;
const stars = document.querySelector(".stars");
const restart = document.querySelector(".restart");
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".play-again-btn");

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
				if (card.classList.contains("matched")) {
					matchedCards.push(card);
					if (matchedCards.length === 8) {
						setTimeout(function() {
							showModal();
						}, 1000);
					}
				}
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
	if (moves === 1) {
		gameTimer();
	}
	// Star rating
	else if (moves > 10 && moves < 12) {
		stars.innerHTML = "<i class='fas fa-star'></i><i class='fas fa-star'></i>";
	} else if (moves > 12) {
		stars.innerHTML = "<i class='fas fa-star'></i>";
	}
}

//  Timer
function gameTimer() {
	interval = setInterval(function() {
		timer.innerHTML = `${min} min ${sec} sec`;
		sec++;
		if (sec === 60) {
			min++;
			sec = 0;
		}
	}, 1000);
}

// Restart the game
function restartGame() {
	newDeck();
	// Remove all classes
	for (const card of cards) {
		card.classList.remove("matched", "disabled", "correct", "card-show", "card-close");
	}
	// Reset moves
	moves = 0;
	document.querySelector(".moves").innerHTML = moves;
	// Reset timer
	min = 0;
	sec = 0;
	timer.innerHTML = `${min} min ${sec} sec`;
	clearInterval(interval);
	// Reset stars
	stars.innerHTML = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>";

}

restart.addEventListener("click", restartGame);

// Congratulations modal
function showModal() {
	modal.classList.add("show-modal");
	// Get final time
	clearInterval(interval);
	const finalTime = timer.innerHTML;
	// Get final moves
	const finalMoves = document.querySelector(".moves").innerHTML;
	// Get final stars
	const finalStars = stars.childElementCount;

	const gameInfo = document.querySelector(".game-info");
	gameInfo.innerHTML = `You finished the game in ${finalTime} with ${finalMoves} moves and got ${finalStars} stars`;
}
// Close modal
modalBtn.addEventListener("click", function() {
	modal.classList.remove("show-modal");
	restartGame();
});

document.addEventListener("DOMContentLoaded", function() {
	newDeck();
	showCards();
});
