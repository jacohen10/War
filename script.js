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

// here I take index 0 of each player's deck and put them into separate arrays so their values can be compared later

var player1Hand = [];
var player2Hand = [];

function play() {
  $(".card").remove();
  $(".winner").remove();
  if (player1.length > 0) {
    player1Hand.push(player1[0]);
    player1.shift();
    if (player2.length > 0) {
      player2Hand.push(player2[0]);
      player2.shift();
    } else alert("game over " + player1Name + " wins");
  } else alert("game over " + player2Name + " wins");
  seeHand(player1Hand);
  seeHand(player2Hand);
  colorCardsRed();
}


function colorCardsRed(){
  for (i=0; i<$(".card").length; i++) {
    if ($(".card").eq(i).text().charAt(1)=== "♦") {
      $(".card").eq(i).css("color","red");
    }
    if ($(".card").eq(i).text().charAt(1)==="♥") {
      $(".card").eq(i).css("color","red");
    }
  }
}

function colorWarCardsRed(){
  for (i=0; i<$('[id*="warCards1"]').length; i++) {
    if ($('[id*="warCards1"]').eq(i).text().charAt(1)=== "♦") {
      $('[id*="warCards1"]').eq(i).css("color","red");
    }
    if ($('[id*="warCards1"]').eq(i).text().charAt(1)==="♥") {
      $('[id*="warCards1"]').eq(i).css("color","red");
    }
    if ($('[id*="warCards2"]').eq(i).text().charAt(1)=== "♦") {
      $('[id*="warCards2"]').eq(i).css("color","red");
    }
    if ($('[id*="warCards2"]').eq(i).text().charAt(1)==="♥") {
      $('[id*="warCards2"]').eq(i).css("color","red");
    }
  }
}


// adding html so you can see the special characters of the suits
function seeHand(player) {
	for(var i=0; i < player.length; i++){
		newDiv = document.createElement('div');
		newDiv.className = 'card';

		if(player[i].suit == 'Diamonds'){
      var ascii_char = '♦';
		} else {
			var ascii_char = '&' + player[i].suit.toLowerCase() + ';';
		}

		newDiv.innerHTML = '' + player[i].name + '' + ascii_char + '';
    $(".cards1").append(newDiv);
	}
}

function seeWarHand(player, x) {
	for(var i=1; i < player.length; i++){
		newDiv = document.createElement('div');
		newDiv.className = 'card';
    $(newDiv).attr("id", "warCards"+x);

		if(player[i].suit == 'Diamonds'){
			var ascii_char = '♦';
		} else {
			var ascii_char = '&' + player[i].suit.toLowerCase() + ';';
		}

		newDiv.innerHTML = '' + player[i].name + '' + ascii_char + '';
    $(".cards2").append(newDiv);
	}
}

function determineWinner() {
  console.log(player1Name,"played", player1Hand[player1Hand.length-1].name, "of", player1Hand[player1Hand.length-1].suit);
  console.log(player2Name,"played", player2Hand[player2Hand.length-1].name, "of", player2Hand[player2Hand.length-1].suit);
  if (player1Hand[player1Hand.length-1].value > player2Hand[player2Hand.length-1].value) {
    winnerTakesCards(player1);
    resetHand();
    winnerNotification(player1Name);
    console.log(player1Name,"wins!");
  } else if (player1Hand[player1Hand.length-1].value < player2Hand[player2Hand.length-1].value) {
    winnerTakesCards(player2);
    resetHand();
    winnerNotification(player2Name);
    console.log(player2Name,"wins!");
  } else if (player1Hand[player1Hand.length-1].value === player2Hand[player2Hand.length-1].value) {
    $(".warCards").remove();
    player1Hand.push(player1[0],player1[1],player1[2],player1[3]);
    player1.splice(0, 4);
    player2Hand.push(player2[0],player2[1],player2[2],player2[3]);
    player2.splice(0, 4);
    seeWarHand(player1Hand, 1);
    seeWarHand(player2Hand, 2);
    colorWarCardsRed();
    moveWarCards();
    lastWarCards();
    determineWinner();
    console.log("War!!!");
  }
}

// moves everything in the 2 arrays that are used for the current hand and adds them to the winner's main array
function winnerTakesCards(player){
  Array.prototype.push.apply(player, player1Hand);
  Array.prototype.push.apply(player, player2Hand);
}

function winnerNotification(player) {
  newDiv = document.createElement('div');
  newDiv.className = "winner";
  newDiv.innerHTML = "<p>"+ player + " wins!</p>";
  $("header").append(newDiv);
}


function resetHand() {
  player1Hand = [];
  player2Hand = [];
}

$("button").eq(1).on("click", function() {
  play();
  determineWinner();
    $(".score1").text(player1Name + "'s Cards remaining: " + player1.length);
    $(".score2").text(player2Name + "'s Cards remaining: " + player2.length);
});

// add player names
var player1Name = "Player 1";
var player2Name = "Player 2";

$("button").eq(0).on("click", function () {
  player1Name = $("input[name='1']").val();
  player2Name = $("input[name='2']").val();
  console.log(player1Name);
  console.log(player2Name);
  $(".score1").text(player1Name + "'s Cards remaining: " + player1.length);
  $(".score2").text(player2Name + "'s Cards remaining: " + player2.length);
});

// moved them so they were easier to target for css
function moveWarCards() {
  $(".topHalf").append($('[id*="warCards1"]'));
  $(".bottomHalf").append($('[id*="warCards2"]'));
}

// adds css to the last card for each player when there's war so it stands out
function lastWarCards() {
  $('[id*="warCards1"]')[$('[id*="warCards1"]').length-1].style.height = "175px";
  $('[id*="warCards1"]')[$('[id*="warCards1"]').length-1].style.width = "125px";
  $('[id*="warCards1"]')[$('[id*="warCards1"]').length-1].style.margin = "55px";
  $('[id*="warCards1"]')[$('[id*="warCards1"]').length-1].style.fontSize = "55px";
  $('[id*="warCards2"]')[$('[id*="warCards2"]').length-1].style.height = "175px";
  $('[id*="warCards2"]')[$('[id*="warCards2"]').length-1].style.width = "125px";
  $('[id*="warCards2"]')[$('[id*="warCards2"]').length-1].style.margin = "55px";
  $('[id*="warCards2"]')[$('[id*="warCards2"]').length-1].style.fontSize = "55px";
}

// forces war(a tie) to happen
function test() {
  player1[0].value = 10;
  player2[0].value = 10;
}
