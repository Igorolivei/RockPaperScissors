//Play counters
var playerRocks = 0;
var playerPapers = 0;
var playerScissors = 0;

//Scores
var player1Score = 0
var player2Score = 0

//Scores elements
var player1ScoreBox = document.getElementById('player1Score');
var player2ScoreBox = document.getElementById('player2Score');

//Choices elements
var player1ChoiceElement = document.getElementById('player1Choice');
var player2ChoiceElement = document.getElementById('player2Choice')

//Weapons list
const weapons = {
    rock: {
        beats: ['scissors'],
    },
    paper: {
        beats: ['rock'],
    },
    scissors: {
        beats: ['paper'],
    },
};

/*
 * Execute a play in both modes
 */
function play(playerChoice) {

	// Check if it's player vs computer, and if not, select a random weapon
    player1Choice = playerChoice ? playerChoice : Math.floor(Math.random() * Object.keys(weapons).length) + 1;

    //If player vs computer, counts the play
    if (playerChoice) {
        if (playerChoice == 'rock') {
            playerRocks++;
        } else if (playerChoice == 'paper') {
            playerPapers++;
        } else {
            playerScissors++;
        }
    //If computer vs computer
    } else {
        if (player1Choice == 1) {
            player1Choice = 'rock';
        } else if (player1Choice == 2) {
            player1Choice = 'paper';
        } else {
            player1Choice = 'scissors';
        }
    }

    //Check if the player has the tendence to play one specific weapon and generates computer's choice
    var playerTendence = checkPlayerTendencies();
    player2Choice = playerTendence != 0 ? choosePlay(playerTendence) : Math.floor(Math.random() * Object.keys(weapons).length) + 1;
	
    if (Number.isInteger(player2Choice)) {
        if (player2Choice == 1) {
            player2Choice = 'rock';
        } else if (player2Choice == 2) {
            player2Choice = 'paper';
        } else {
            player2Choice = 'scissors';
        }
    }

    //Writes on the UI the chosen weapon
    player1ChoiceElement.innerHTML = player1Choice;
    player2ChoiceElement.innerHTML = player2Choice;

    //Gets the winner 
    var winner = compareWeapons(player1Choice, player2Choice);
    if (winner == 1) {
        player1Score++;
    } else if (winner == 2) {
        player2Score++;
    } else {
        alert("Oh, this is a tie!");
    }
    return updateScores();
}

/*
 * Check if player has tendencies to play the same weapon, and which weapon he plays more
 * Obs.: Considered just if more than 60% of plays are the same weapon
 */
function checkPlayerTendencies() {
    var totalPlays = playerRocks + playerPapers + playerScissors;
    var pRock = playerRocks / totalPlays;
    var pPaper = playerPapers / totalPlays;
    var pScissors = playerScissors / totalPlays;

    //If it's not the first play
    if (totalPlays > 1) {
        if (pRock >= 0.60) {
            return 'rock';
        } else if (pPaper >= 0.60) {
            return 'paper';
        } else if (pScissors >= 0.60) {
            return 'scissors';
        }
    }
    return false;
}

/*
 * Based on the percentage of the player's plays, chooses computer's next play
 */
function choosePlay(playerTendence) {
    var aWeapons = Object.keys(weapons);
    //Finds the weapon that beats the player tendence
    for (i in aWeapons) {
        if (weapons[aWeapons[i]].beats.indexOf(playerTendence) >= 0) {
            return aWeapons[i];         
        }
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
 * Update scores
 */
function updateScores() {
	player1ScoreBox.innerHTML = player1Score;
	player2ScoreBox.innerHTML = player2Score;
}	

/*
 * Set scores to zero and update them on UI
 */
function resetGame() {
    player1Score = 0;
    player2Score = 0;
    playerRocks = 0;
    playerPapers = 0;
    playerScissors = 0;
    updateScores();
}

//GAME MENU

/* Game modes: 
    1 - Player vs. Computer
    2 - Computer vs. Computer
*/
var gameMode = 1;
/* Game symbols: 
    1 - Hands
    2 - Objects
*/
var gameSymbols = 1;

/*
 * Switch to Player vs Computer or Computer vs Computer
 */
function switchGameMode() {
    gameMode = gameMode == 1 ? 2 : 1;
    resetGame();
    checkGameMode();
}

function checkGameMode() {
    var player1Name = document.getElementById("player1Name");
    var player2Name = document.getElementById("player2Name");
    var player1ScoreName = document.getElementById("player1ScoreName");
    var player2ScoreName = document.getElementById("player2ScoreName");
    var player1Choice = document.getElementById("player1Choice");
    var player2Choice = document.getElementById("player2Choice");
    var gamePvCTitle = document.getElementById("game-pvc-title");
    var gameCvCTitle = document.getElementById("game-cvc-title");
    var btnSwitchGameMode = document.getElementById("switchGameMode-btn");
    var divPlayerVsComputer = document.getElementById("playerVsComputerGame");
    var divComputerVsComputer = document.getElementById("computerVsComputerGame");

    if (gameMode == 1) {
        //Player vs. Computer
        player1Name.innerHTML = "Player";
        player2Name.innerHTML = "Computer";
        player1ScoreName.innerHTML = "Player";
        player2ScoreName.innerHTML = "Computer";
        btnSwitchGameMode.innerHTML = "Switch to Computer vs. Computer";
        gamePvCTitle.innerHTML = "Make your choice!";
        player1Choice.innerHTML = "Choose your weapon";
        player2Choice.innerHTML = "I'm waiting for you!";
        divPlayerVsComputer.style.display = 'block';
        divComputerVsComputer.style.display = 'none';
    } else {
        //Computer vs. Computer
        player1Name.innerHTML = "Computer 1";
        player2Name.innerHTML = "Computer 2";
        player1ScoreName.innerHTML = "Computer 1";
        player2ScoreName.innerHTML = "Computer 2";
        btnSwitchGameMode.innerHTML = "Switch to Player vs. Computer";
        gameCvCTitle.innerHTML = "Computer vs. Computer";
        player1Choice.innerHTML = "I'll beat you!";
        player2Choice.innerHTML = "Let's see, buddy!";
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
    //Player vs Computer div
    var rockPvCSymbol = document.getElementById("rock-pvc-img");
    var paperPvCSymbol = document.getElementById("paper-pvc-img");
    var scissorsPvCSymbol = document.getElementById("scissors-pvc-img");
    //Computer vs Computer div
    var rockCvCSymbol = document.getElementById("rock-cvc-img");
    var paperCvCSymbol = document.getElementById("paper-cvc-img");
    var scissorsCvCSymbol = document.getElementById("scissors-cvc-img");
    var btnSwitchGameSymbols = document.getElementById("switchGameSymbols-btn");

    if (gameSymbols == 1) {
        //Hands symbols
        rockPvCSymbol.src = "assets/img/rock-hand.png";
        rockCvCSymbol.src = "assets/img/rock-hand.png";
        paperPvCSymbol.src = "assets/img/paper-hand.png";
        paperCvCSymbol.src = "assets/img/paper-hand.png";
        scissorsPvCSymbol.src = "assets/img/scissors-hand.png";
        scissorsCvCSymbol.src = "assets/img/scissors-hand.png";
        btnSwitchGameSymbols.innerHTML = "Switch to objects symbols";
    } else {
        //Objects symbols
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