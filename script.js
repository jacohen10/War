function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

// making the deck and giving each card a name, suit, and value
function deck(){
	this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K','A'];
	this.suits = ['Hearts','Diamonds','Spades','Clubs'];
	var cards = [];

    for (var s = 0; s < this.suits.length; s++) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push( new card( n+1, this.names[n], this.suits[s] ) );
        }
    }
    return cards;
}

var myDeck = new deck();
console.log(myDeck);

// adding html so you can see the deck. going to want to hide this eventually
window.onload = function() {

	for(var i=0; i < myDeck.length; i++){
		div = document.createElement('div');
		div.className = 'card';

		if(myDeck[i].suit == 'Diamonds'){
			var ascii_char = '♦';
		} else {
			var ascii_char = '&' + myDeck[i].suit.toLowerCase() + ';';
		}

		div.innerHTML = '' + myDeck[i].name + '' + ascii_char + '';
		document.body.appendChild(div);
	}
};

// function to shuffle the deck
function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

myDeck = shuffle(myDeck);

// evenly split the deck between 2 players
var player1 = [];
var player2 = [];
for (i=0; i<((myDeck.length)/2); i++) {
  player1.push(myDeck[i]);
}
for (i=51; i>=((myDeck.length)/2); i--) {
  player2.push(myDeck[i]);
}

// here I need to take the card from the top of each players' deck and compare their values

var player1Hand = [];
var player2Hand = [];

function play() {
  if (player1.length > 0) {
    player1Hand.push(player1[0]);
    player1.shift();
    if (player2.length > 0) {
      player2Hand.push(player2[0]);
      player2.shift();
    } else alert("game over player 1 wins");
  } else alert("game over player 2 wins");
}

function determineWinner() {
  if (player1Hand[0].value > player2Hand[0].value) {
    // player1.push(player1hand[0]);
    // player1.push(player2hand);
    // player1hand.shift();
    // player2hand.shift();
    console.log("Player 1 wins!");
  } else if (player1Hand[0].value < player2Hand[0].value) {
    console.log("Player 2 wins!");
  } else if (player1Hand[0].value === player2Hand[0].value) {
    console.log("War!!!");
  }
}

$("button").on("click", function() {
  play();
  console.log(player1Hand);
  console.log(player2Hand);
  determineWinner();

});

console.log(player1Hand.length);
console.log(player2Hand.length);





// whoever has the card with the higher value gets to keep both cards
