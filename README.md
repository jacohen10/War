# project1
1. Players should receive a random hand of cards so that the game is fair.
2. Players should see every hand and the winner so that they get an experience similar to playing with physical cards
3. The cards should look as close to real cards as possible to enhance the playing experience of the players
4. Players should see how many cards they have left so that they know if they're winning or losing
5. Players should be able to enter in their names so that they have a personalized way of knowing whose turn it is
6. There should be added CSS when there is war(a tie) to make it more exciting for the user.


Technologies:

Array.prototype.push.apply(player, player1Hand);
The above code allowed me to take everything in the 2 players' hands(arrays) that were being played and move them into the winner's main deck(another array). This was really helpful because it works on regular hands, but also war hands which involves moving 5 cards(elements) at a time.

I used the following jquery to target an ID $('[id*="warCards1"]'). I was hoping to use a for loop with this and add the letter "i" where the number 1 is because this would make the code more DRY, however I wasn't able to figure this part out. It still works, but it's just more repetitive than it needs to be.

Approach taken:
Once I had the deck made and shuffled I split the deck in 2 arrays. After that I took out index 0 from each array and put them in new and separate arrays. Then I compared their value keys to determine which one was greater. Whichever one was greater would then have both added back to their associated main deck. This is repeated until one player runs out of cards (their array becomes empty).

One additional feature is when the value keys are equal it starts a "war". This adds an additional 4 cards from each of the main arrays/decks and puts them in the playing hands/arrays. The key value of the last cards added are then compared and the winner then gets all 10 cards in the playing hands/arrays added to their main deck/array.



Unsolved problems:

1. When there are two wars in a row, the CSS isn't set up to handle it. I'm exploring ways to fix this, but I think implementing bootstrap here could potentially be very helpful.

2. One of the bonuses is to allow 3 people to play. Everything I coded was geared towards this being a 2 player game, so I'll have to explore what my options are in order for a 3rd person to play.
