//Play counters
var totalPlays = 0;

/* Menu's vars */

//Game modes: 1 - Player vs. Computer; 2 - Computer vs. Computer
var gameMode = 1;
var lBestOfFive = 0;
//Game symbols: 1 - Hands; 2 - Objects
var gameSymbols = 1;
//Buttons
var btnSwitchGameMode = document.getElementById("switch-game-mode-btn");
var btnSwitchGameSymbols = document.getElementById("switch-game-symbols-btn");

/* UI's vars */

//Score's elements
var player1ScoreBox = document.getElementById('player1-score');
var player1Score = 0;
var player1ScoreName = document.getElementById("player1-score-name");
var player2ScoreBox = document.getElementById('player2-score');
var player2Score = 0;
var player2ScoreName = document.getElementById("player2-score-name");
var tieScoreBox = document.getElementById('tie-score');
var tieScore = 0;

//Choice's and result's elements
var resultMessage = document.getElementById('result-msg');
var player1ChoiceImage = document.getElementById('player1-choice-img');
var player2ChoiceImage = document.getElementById('player2-choice-img');
var player1Name = document.getElementById("player1-name");
var player2Name = document.getElementById("player2-name");

//Person vs Computer mode
var gamePvCTitle = document.getElementById("game-pvc-title");
var rockPvCSymbol = document.getElementById("rock-pvc-img");
var paperPvCSymbol = document.getElementById("paper-pvc-img");
var scissorsPvCSymbol = document.getElementById("scissors-pvc-img");
var divPlayerVsComputer = document.getElementById("playerVsComputer-game");

//Computer vs Computer mode
var gameCvCTitle = document.getElementById("game-cvc-title");
var rockCvCSymbol = document.getElementById("rock-cvc-img");
var paperCvCSymbol = document.getElementById("paper-cvc-img");
var scissorsCvCSymbol = document.getElementById("scissors-cvc-img");
var divComputerVsComputer = document.getElementById("computerVsComputer-game");

//Weapons list
const weapons = {
    rock: {
        beats: ['scissors'],
        counter: 0,
    },
    paper: {
        beats: ['rock'],
        counter: 0,
    },
    scissors: {
        beats: ['paper'],
        counter: 0,
    },
};
var weaponsKeys = Object.keys(weapons);

/*
 * Execute a play in both modes
 */
function play(playerChoice) {
    //Checks and gets player's tendencies
    var playerTendency = checkPlayerTendencies();
    //Choose randomly if the next computer play will consider the player's tendency
    // (There's 2/3 of chance of the next play be random)
    var playRandom = Math.random() > 0.33 ? true : false;
    //Check if it's player vs computer, and if not, select a random weapon
    player1Choice = playerChoice ? playerChoice : 
                     Math.floor(Math.random() * Object.keys(weapons).length);
    //Check if the player has the tendency to play one specific weapon and generates computer's choice
    player2Choice = playerTendency != false && !playRandom ? choosePlay(playerTendency) : 
                     Math.floor(Math.random() * Object.keys(weapons).length);

    //If player vs computer, counts the play
    if (playerChoice) {
        weapons[playerChoice].counter++;
        totalPlays++;
    //If computer vs computer
    } else {
        player1Choice = Object.keys(weapons)[player1Choice];
    }
	
    if (Number.isInteger(player2Choice)) {
        player2Choice = Object.keys(weapons)[player2Choice];
    }

    //Gets the winner 
    var winner = compareWeapons(player1Choice, player2Choice);
    writeResult(player1Choice, player2Choice, winner);
 	updateScores();
    
    if(lBestOfFive && (player1Score + player2Score >= 5)) {
		var winnerBF = "";
		winnerBF = player1Score > player2Score ? "You" : "Computer";
		if (confirm(winnerBF+" won the best of five! Play again?")) {
			resetGame(true);
		}
    	resetGame(false);
    }
}

/*
 * Compare weapons to check the winner
 */
function compareWeapons(player1Choice, player2Choice) {
    //Check if it's a tie
    if (player1Choice == player2Choice) {
        return 0;
    }
    //Check if player1's weapon beats player2's weapon
    if (weapons[player1Choice].beats.indexOf(player2Choice) >= 0) {
        return 1;         
    }
    return 2;
}

/*
 * Check if player has tendencies to play the same weapon, and which weapon he plays more
 * Obs.: Considered just if more than 60% of plays are the same weapon
 */
function checkPlayerTendencies() {
    for (i in weaponsKeys) {
        var pWeapon = weapons[weaponsKeys[i]].counter / totalPlays;
        if (pWeapon >= 0.60) {
            return weaponsKeys[i];
        }
    }
    return false;
}

/*
 * Based on the percentage of the player's plays, chooses computer's next play
 */
function choosePlay(playerTendency) {
    //Finds the weapon that beats the player tendency
    for (i in weaponsKeys) {
        if (weapons[weaponsKeys[i]].beats.indexOf(playerTendency) >= 0) {
            return weaponsKeys[i];         
        }
    }
}

/*
 * Writes player choices on UI and post the result
 */
function writeResult(player1Choice, player2Choice, winner) {    
    //Sets the choices images
    player1ChoiceImage.src = gameSymbols == 1 ? "assets/img/"+player1Choice+"-hand.png" :
    						  "assets/img/"+player1Choice+"-symbol.png";
    player2ChoiceImage.src = gameSymbols == 1 ? "assets/img/"+player2Choice+"-hand.png" :
    						  "assets/img/"+player2Choice+"-symbol.png";
    //Show the names
    player1Name.style.visibility = 'visible';
    player2Name.style.visibility = 'visible';

    if (winner == 1) {
        player1Score++;
        resultMessage.innerHTML = gameMode == 1 ? "You won!" : "Computer 1 won!";
    } else if (winner == 2) {
        player2Score++;
        resultMessage.innerHTML = gameMode == 1 ? "You lost :(" : "Computer 2 won!";
    } else {
        resultMessage.innerHTML = "Hmm... that's a tie!";
        tieScore++;
    }
}

/*
 * Update scores
 */
function updateScores() {
	player1ScoreBox.innerHTML = player1Score;
	player2ScoreBox.innerHTML = player2Score;
    tieScoreBox.innerHTML = tieScore;
}	

/*
 * Set scores to zero and update them on UI
 */
function resetGame(bestOfFive) {
    
	if(bestOfFive == false) {
		lBestOfFive = false;
		checkGameMode();
	}

    player1Score = 0;
    player2Score = 0;
    player1ChoiceImage.src = "";
    player2ChoiceImage.src = "";
    player1Name.style.visibility = 'hidden';
    player2Name.style.visibility = 'hidden';
    resultMessage.innerHTML = "";
    tieScore = 0;
    for(i in weaponsKeys) {
    	weapons[weaponsKeys[i]].counter = 0;
    }
    updateScores();
}

//GAME MENU

/*
 * Switch to Player vs Computer or Computer vs Computer
 */
function switchGameMode(bestOfFive) {
    if (bestOfFive) {
    	gameMode = 1;
    	lBestOfFive = 1;
    } else {
    	gameMode = gameMode == 1 ? 2 : 1;
    	lBestOfFive = 0;
    }
    resetGame(bestOfFive);
    checkGameMode();
}

function checkGameMode() {
    //Player vs. Computer
    if (gameMode == 1) {
        player1Name.innerHTML = "Player";
        player2Name.innerHTML = "Computer";
        player1ScoreName.innerHTML = "Player";
        player2ScoreName.innerHTML = "Computer";
        btnSwitchGameMode.innerHTML = "Switch to Computer vs. Computer (Simulation mode)";
        gamePvCTitle.innerHTML = lBestOfFive ? "Best of Five: Make your choice!" : "Make your choice!";
        divPlayerVsComputer.style.display = 'block';
        divComputerVsComputer.style.display = 'none';
    //Computer vs. Computer
    } else {
        player1Name.innerHTML = "Computer 1";
        player2Name.innerHTML = "Computer 2";
        player1ScoreName.innerHTML = "Computer 1";
        player2ScoreName.innerHTML = "Computer 2";
        btnSwitchGameMode.innerHTML = "Switch to Player vs. Computer";
        gameCvCTitle.innerHTML = "Computer vs. Computer";
        divPlayerVsComputer.style.display = 'none';
        divComputerVsComputer.style.display = 'block';
    }
}

/*
 * Switch to hands symbols mode or objects symbols mode
 */
function switchGameSymbols() {
    gameSymbols = gameSymbols == 1 ? 2 : 1;
    return checkGameSymbols();
}

function checkGameSymbols() {
    //Hands symbols
    if (gameSymbols == 1) {
        rockPvCSymbol.src = "assets/img/rock-hand.png";
        rockCvCSymbol.src = "assets/img/rock-hand.png";
        paperPvCSymbol.src = "assets/img/paper-hand.png";
        paperCvCSymbol.src = "assets/img/paper-hand.png";
        scissorsPvCSymbol.src = "assets/img/scissors-hand.png";
        scissorsCvCSymbol.src = "assets/img/scissors-hand.png";
        btnSwitchGameSymbols.innerHTML = "Switch to objects symbols";
    //Objects symbols
    } else {
        rockPvCSymbol.src = "assets/img/rock-symbol.png";
        rockCvCSymbol.src = "assets/img/rock-symbol.png";
        paperPvCSymbol.src = "assets/img/paper-symbol.png";
        paperCvCSymbol.src = "assets/img/paper-symbol.png";
        scissorsPvCSymbol.src = "assets/img/scissors-symbol.png";
        scissorsCvCSymbol.src = "assets/img/scissors-symbol.png";
        btnSwitchGameSymbols.innerHTML = "Switch to hands symbols";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkGameMode();
    checkGameSymbols();
}, false);