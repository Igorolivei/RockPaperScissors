//Scores
var player2Score = 0
var player1Score = 0

//Scores elements
var player1ScoreBox = document.getElementById('player1Score');
var player2ScoreBox = document.getElementById('player2Score');

//Choices elements
var player1ChoiceElement = document.getElementById('player1Choice');
var player2ChoiceElement = document.getElementById('player2Choice')

function playerVsComputer(player1Choice) {

	/* Generates computer choice. */
	player2Choice = Math.floor(Math.random() * 3) + 1;
	
	if (player2Choice == 1) {
	    player2Choice = "rock";
	} else if(player2Choice == 2) {
	    player2Choice = "paper";
	} else {
		player2Choice = "scissors";
	}
	
	player1ChoiceElement.innerHTML = player1Choice;
	player2ChoiceElement.innerHTML = player2Choice;

	compareWeapons(player1Choice, player2Choice);
}

function computerVsComputer() {

    /* Generates computers choices. */
    player1Choice = Math.floor(Math.random() * 3) + 1;
    player2Choice = Math.floor(Math.random() * 3) + 1;
    
    if (player2Choice == 1) {
        player2Choice = "rock";
    } else if(player2Choice == 2) {
        player2Choice = "paper";
    } else {
        player2Choice = "scissors";
    }
    
    player1ChoiceElement.innerHTML = player1Choice;
    player2ChoiceElement.innerHTML = player2Choice;

    compareWeapons(player1Choice, player2Choice);
}

function compareWeapons(player1Choice, player2Choice) {

    if (player1Choice == player2Choice) {
        alert("Oh, this is a tie!")
        return false;
    }

    if (player1Choice == "rock") {
    	if (player2Choice == "scissors") { 
            player1Score++;         
        }
        else {
            player2Score++;
        }
        return updateScores();
    }
    
    if (player1Choice == "paper") { 	
        if (player2Choice == "rock") {
            player1Score++;
        }
        else {
            player2Score++;
        }
        return updateScores();
    }

    if (player1Choice == "scissors") {    
        if (player2Choice == "rock") {
            player2Score++;
        }
        else {
            player1Score++;
        }
        return updateScores();
    }
}

function updateScores() {
	player1ScoreBox.innerHTML = player1Score;
	player2ScoreBox.innerHTML = player2Score;
}	

function resetGame() {
    player1Score = 0;
    player2Score = 0;
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