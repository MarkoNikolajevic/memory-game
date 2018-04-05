// Define variables
const game = {
	cards: document.querySelectorAll(".card"),
	deck: document.querySelector(".card-board"),
	moves: 0,
	sec: 0,
	min: 0,
	openCards: [],
	matchedCards: [],
	info: document.querySelector(".game-info"),
	ui: {
		stars: document.querySelector(".stars"),
		timer: document.querySelector(".timer"),
		restart: document.querySelector(".restart"),
		modal: document.querySelector(".modal-container"),
		modalBtn: document.querySelector(".play-again-btn"),
	},
};
game.cards = Array.from(game.cards);
let interval;

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
	let shuffCards = shuffle(game.cards);
	game.deck.innerHTML = "";
	shuffCards.forEach(function(el) {
		game.deck.append(el);
	});
}

// Show cards function
function showCards() {
	for (const card of game.cards) {
		card.addEventListener("click", function() {
			card.classList.add("card-open", "card-show", "disabled");
			if (!game.openCards.includes(card)) {
				game.openCards.push(card);
			}
			if (game.openCards.length === 2 && game.openCards[0].firstElementChild.getAttribute("data-icon") === game.openCards[1].firstElementChild.getAttribute("data-icon")) {
				matched();
				if (card.classList.contains("matched")) {
					game.matchedCards.push(card);
					if (game.matchedCards.length === 8) {
						setTimeout(function() {
							showModal();
							game.matchedCards = [];
						}, 1000);
					}
				}
				movesCounter();
				game.openCards = [];
			} else if (game.openCards.length === 2 && game.openCards[0].firstElementChild.getAttribute("data-icon") !== game.openCards[1].firstElementChild.getAttribute("data-icon")) {
				unmatched();
				setTimeout(function() {
					closeCards();
					game.openCards = [];
				}, 800);
				movesCounter();
			}
		});
	}
}

// Close cards
function closeCards() {
	for (let i = 0; i < game.openCards.length; i++) {
		if (!game.openCards[i].classList.contains("matched")) {
			game.openCards[i].classList.add("card-close");
			game.openCards[i].classList.remove("card-open", "card-show", "unmatched", "disabled");
		}
	}
}

// Matched
function matched() {
	game.openCards[0].classList.remove("card-open");
	game.openCards[0].classList.add("matched", "correct");
	game.openCards[1].classList.remove("card-open");
	game.openCards[1].classList.add("matched", "correct");
}

// Unmatched
function unmatched() {
	game.openCards[0].classList.remove("card-open");
	game.openCards[0].classList.add("unmatched");
	game.openCards[1].classList.remove("card-open");
	game.openCards[1].classList.add("unmatched");
}

// Moves counter
function movesCounter() {
	game.moves++;
	document.querySelector(".moves").innerHTML = game.moves;
	if (game.moves === 1) {
		gameTimer();
	}
	// Star rating
	else if (game.moves > 10 && game.moves < 12) {
		game.ui.stars.innerHTML = "<i class='fas fa-star'></i><i class='fas fa-star'></i>";
	} else if (game.moves > 12) {
		game.ui.stars.innerHTML = "<i class='fas fa-star'></i>";
	}
}

//  Timer
function gameTimer() {
	interval = setInterval(function() {
		game.ui.timer.innerHTML = `${game.min} min ${game.sec} sec`;
		game.sec++;
		if (game.sec === 60) {
			game.min++;
			game.sec = 0;
		}
	}, 1000);
}

// Restart the game
function restartGame() {
	// Clear arrays
	game.openCards = [];
	game.matchedCards = [];
	newDeck();
	// Remove all classes
	for (const card of game.cards) {
		card.classList.remove("matched", "disabled", "correct", "card-show", "card-open", "card-close");
	}
	// Reset moves
	game.moves = 0;
	document.querySelector(".moves").innerHTML = game.moves;
	// Reset timer
	game.min = 0;
	game.sec = 0;
	game.ui.timer.innerHTML = `${game.min} min ${game.sec} sec`;
	clearInterval(interval);
	// Reset stars
	game.ui.stars.innerHTML = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>";
}

game.ui.restart.addEventListener("click", restartGame);

// Congratulations modal
function showModal() {
	game.ui.modal.classList.add("show-modal");
	// Get final time
	clearInterval(interval);
	const finalTime = game.ui.timer.innerHTML;
	// Get final moves
	const finalMoves = document.querySelector(".moves").innerHTML;
	// Get final stars
	const finalStars = game.ui.stars.childElementCount;

	game.info.innerHTML = `You finished the game in ${finalTime} with ${finalMoves} moves and got ${finalStars} stars!`;
	// Add focus to modal button
	game.ui.modalBtn.focus();
}
// Close modal
game.ui.modalBtn.addEventListener("click", function() {
	game.ui.modal.classList.remove("show-modal");
	restartGame();
});

document.addEventListener("DOMContentLoaded", function() {
	newDeck();
	showCards();
});
