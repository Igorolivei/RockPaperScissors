# RockPaperScissors

## Demo
You can play a live demo on https://playrps.herokuapp.com

## How to run
To play Rock, Paper, Scissors, you just need to open the index.html file on your preferred browser and enjoy it

## About the game

### Score
The score is updated in each play. If you want to reset the score, you can start a new game.

### Modes 
You can play on the mode Player vs. Computer, where you will be playing against the computer, or play the mode Computer vs. Computer to watch a match of computer against itself. Note that in the Computer vs. Computer mode, you need to press "Play Again" everytime that you want a new play.
There's also the "Best of Five" mode, where you can play against the computer, and the player who have the higher score within five plays (ties are not considered), wins the game.

### Symbols
You can switch the symbols to hand symbols or object symbols using the option on menu. If you switch the symbols during a match, the score won't change.

### Logic
Based on the history of your plays, this game can see if you have any kind of preference for one specific weapon, and sometimes (this 
 is chosen randomly) it will play against your preference.
 
## Tests

The tests were written using the framework Jasmine. To execute the tests open the file SpecRunner.html (present on the folder tests) in a browser.