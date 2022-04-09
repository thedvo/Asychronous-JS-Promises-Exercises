let baseURL = 'http://deckofcardsapi.com/api/deck';
let cardValue;
let cardSuit;

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// Async & Await

async function newDeck() {
	let response = await axios.get(`${baseURL}/new/draw/?count=1`);
	cardValue = response.data.cards[0].value;
	cardSuit = response.data.cards[0].suit;

	console.log(`${cardValue} of ${cardSuit}`);
}

newDeck();

// axios.get(`${baseURL}/new/draw/?count=1`).then((response) => {
// 	cardValue = response.data.cards[0].value;
// 	cardSuit = response.data.cards[0].suit;

// 	console.log(`${cardValue} of ${cardSuit}`);
// });

/*  2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. 

Once you have both cards, console.log the values and suits of both cards */

// Async & Await
async function drawCard() {
	let card1 = await axios.get(`${baseURL}/new/draw/?count=1`);
	let card2 = await axios.get(`${baseURL}/${card1.data.deck_id}/draw/?count=1`);

	let cardValue1 = card1.data.cards[0].value;
	let cardSuit1 = card1.data.cards[0].suit;

	let cardValue2 = card2.data.cards[0].value;
	let cardSuit2 = card2.data.cards[0].suit;

	console.log(`${cardValue1} of ${cardSuit1}`);
	console.log(`${cardValue2} of ${cardSuit2}`);
}

drawCard();

// axios
// 	.get(`${baseURL}/new/draw/?count=1`)
// 	.then((card_1) => {
// 		cardValue = card_1.data.cards[0].value;
// 		cardSuit = card_1.data.cards[0].suit;

// 		console.log(`${cardValue} of ${cardSuit}`);
// 		return axios.get(`${baseURL}/${card_1.data.deck_id}/draw/?count=1`);
// 	})
// 	.then((card_2) => {
// 		cardValue = card_2.data.cards[0].value;
// 		cardSuit = card_2.data.cards[0].suit;

// 		console.log(`${cardValue} of ${cardSuit}`);
// 	});

// 3.  Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let $btn = $('button');
let $cardDiv = $('div');
let deckId;

// Async & Await
async function drawCardFromDeck() {
	let deck = await axios.get(`${baseURL}/new/shuffle/`);
	deckId = deck.data.deck_id;

	$btn.on('click', async function () {
		let card = await axios.get(`${baseURL}/${deckId}/draw/`);

		let cardImage = card.data.cards[0].image;
		let angle = Math.random() * 90 - 45;
		let randomX = Math.random() * 40 - 20;
		let randomY = Math.random() * 40 - 20;

		$cardDiv.append(
			$('<img>', {
				src: cardImage,
				css: {
					transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
				},
			})
		);
	});
}

drawCardFromDeck();

// axios.get(`${baseURL}/new/shuffle/`).then((response) => {
// 	deckId = response.data.deck_id;
// });

// $btn.on('click', function () {
// 	axios
// 		.get(`${baseURL}/${deckId}/draw/`)
// 		.then((response) => {
// 			let cardImage = response.data.cards[0].image;
// 			let angle = Math.random() * 90 - 45;
// 			let randomX = Math.random() * 40 - 20;
// 			let randomY = Math.random() * 40 - 20;

// 			$cardDiv.append(
// 				$('<img>', {
// 					src: cardImage,
// 					css: {
// 						transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
// 					},
// 				})
// 			);
// 		})
// 		.catch((err) =>
// 			console.log(`No more cards! Refresh to start again. ---> : ${err}`)
// 		);
// });
