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
  seeHand(player1Hand);
  seeHand(player2Hand);
}

// adding html so you can see the deck. going to want to hide this eventually
function seeHand(player) {
	for(var i=0; i < player.length; i++){
		div = document.createElement('div');
		div.className = 'card';

		if(player[i].suit == 'Diamonds'){
			var ascii_char = '♦';
		} else {
			var ascii_char = '&' + player[i].suit.toLowerCase() + ';';
		}

		div.innerHTML = '' + player[i].name + '' + ascii_char + '';
		document.body.appendChild(div);
	}
}

function seeWarHand(player) {
	for(var i=1; i < player.length; i++){
		div = document.createElement('div');
		div.className = 'card';

		if(player[i].suit == 'Diamonds'){
			var ascii_char = '♦';
		} else {
			var ascii_char = '&' + player[i].suit.toLowerCase() + ';';
		}

		div.innerHTML = '' + player[i].name + '' + ascii_char + '';
		document.body.appendChild(div);
	}
}

function determineWinner() {

  console.log("player 1 played", player1Hand[player1Hand.length-1].name, "of", player1Hand[player1Hand.length-1].suit);
  console.log("player 2 played", player2Hand[player2Hand.length-1].name, "of", player2Hand[player2Hand.length-1].suit);
  if (player1Hand[player1Hand.length-1].value > player2Hand[player2Hand.length-1].value) {
    Array.prototype.push.apply(player1, player1Hand);
    Array.prototype.push.apply(player1, player2Hand);
    player1Hand = [];
    player2Hand = [];
    console.log("Player 1 wins!");
  } else if (player1Hand[player1Hand.length-1].value < player2Hand[player2Hand.length-1].value) {
    Array.prototype.push.apply(player2, player2Hand);
    Array.prototype.push.apply(player2, player1Hand);
    player1Hand = [];
    player2Hand = [];
    console.log("Player 2 wins!");
  } else if (player1Hand[player1Hand.length-1].value === player2Hand[player2Hand.length-1].value) {
    player1Hand.push(player1[0],player1[1],player1[2],player1[3]);
    player1.splice(0, 4);
    player2Hand.push(player2[0],player2[1],player2[2],player2[3]);
    player2.splice(0, 4);
    seeWarHand(player1Hand);
    seeWarHand(player2Hand);
    determineWinner();
    console.log("War!!!");
  }
}

$("button").on("click", function() {
  play();
  determineWinner();
});







// whoever has the card with the higher value gets to keep both cards
