//Scores
var computerScore = 0
var playerScore = 0

//Scores elements
var playerScoreBox = document.getElementById('playerScore');
var computerScoreBox = document.getElementById('computerScore');

//Choices elements
var playerChoiceElement = document.getElementById('playerChoice');
var computerChoiceElement = document.getElementById('computerChoice')

function play(playerChoice) {

	/* Generates computer choices. To add a weapon, 
	    increase in 1 the multiplier of the random generator*/
	computerChoice = Math.floor(Math.random() * 3) + 1;
	
	if (computerChoice == 1) {
	    computerChoice = "rock";
	} else if(computerChoice == 2) {
	    computerChoice = "paper";
	} else {
		computerChoice = "scissors";
	}
	
	playerChoiceElement.innerHTML = playerChoice;
	computerChoiceElement.innerHTML = computerChoice;

	compareWeapons(playerChoice, computerChoice);
}

function compareWeapons(playerChoice, computerChoice) {

    if (playerChoice == computerChoice) {
        alert("Oh, this is a tie!")
        return false;
    }

    if (playerChoice == "rock") {
    	if (computerChoice == "scissors") { 
            playerScore++;         
        }
        else {
            computerScore++;
        }
        return updateScores();
    }
    
    if (playerChoice == "paper") { 	
        if (computerChoice == "rock") {
            playerScore++;
        }
        else {
            computerScore++;
        }
        return updateScores();
    }

    if (playerChoice == "scissors") {    
        if (computerChoice == "rock") {
            computerScore++;
        }
        else {
            playerScore++;
        }
        return updateScores();
    }
}

function updateScores() {
	playerScoreBox.innerHTML = playerScore;
	computerScoreBox.innerHTML = computerScore;
}	
