/*
 * Module rockPaperScissors
 * (using Revealing module pattern)
 */
var rockPaperScissors = (function() {
    //Play counters
    var iTotalPlays = 0;
    //Game modes: 1 - Player vs. Computer; 2 - Computer vs. Computer
    var iGameMode = 1;
    //Best of five: true - Playing Best of Five mode; False - Playing normal mode
    var lBestOfFive = false;
    //Game symbols: 1 - Hands; 2 - Objects
    var iGameSymbolsMode = 1;
    //Scores
    var iPlayer1Score = 0;
    var iPlayer2Score = 0;
    var iTieScore = 0;
    var iWinner = 0;
    var sWinnerBoF = "";
    //Weapons list - to add a new weapon you just need to update this array, and the UI's elements
    const weapons = {
        rock: {
            beats: ["scissors"],
            counter: 0
        },
        paper: {
            beats: ["rock"],
            counter: 0
        },
        scissors: {
            beats: ["paper"],
            counter: 0
        }
    };
    var aWeaponsKeys = Object.keys(weapons);

    /*
     * Execute a play in all modes
     */
    var play = function (playerChoice) {
        //Checks and gets player's tendencies
        var playerTendency = checkPlayerTendencies();
        //Choose randomly if the next computer play will consider the player's tendency
        // (There's 2/3 of chance of the next play be random)
        var playRandom = Math.random() > 0.33 ? true : false;
        //Check if it's player vs computer, and if not, select a random weapon
        player1Choice = playerChoice ? playerChoice : Math.floor(Math.random() * aWeaponsKeys.length);
        //Check if the player has the tendency to play one specific weapon and generates computer's choice
        player2Choice = playerTendency != false && !playRandom ? choosePlay(playerTendency) : Math.floor(Math.random() * aWeaponsKeys.length);

        //If player vs computer, counts the play
        if (playerChoice) {
            weapons[playerChoice].counter++;
            iTotalPlays++;
        //If computer vs computer
        } else {
            player1Choice = Object.keys(weapons)[player1Choice];
        }

        if (Number.isInteger(player2Choice)) {
            player2Choice = Object.keys(weapons)[player2Choice];
        }

        //Gets the winner and returns the play's result
        var result = new Object();
        iWinner = compareWeapons(player1Choice, player2Choice);
        if (iWinner == 1) {
            iPlayer1Score++;
        } else if (iWinner == 2) {
            iPlayer2Score++;
        } else {
            iTieScore++;
        }

        if(lBestOfFive && (iPlayer1Score + iPlayer2Score >= 5)) {
            sWinnerBoF = iPlayer1Score > iPlayer2Score ? "You" : "Computer";
            result.winnerBoF = sWinnerBoF;
        }

        result.winner = iWinner;
        result.player1Choice = player1Choice;
        result.player2Choice = player2Choice;
        return result;
    };

    /*
     * Compare weapons to check the winner
     */
    var compareWeapons = function (player1Choice, player2Choice) {
        //Check if it's a tie
        if (player1Choice == player2Choice) {
            return 0;
        }
        //Check if player1's weapon beats player2's weapon
        if (weapons[player1Choice].beats.indexOf(player2Choice) >= 0) {
            return 1;
        }
        return 2;
    };

    /*
     * Check if player has tendencies to play the same weapon, and which weapon he plays more
     * Obs.: Considered just if more than 60% of plays are the same weapon
     */
    var checkPlayerTendencies = function () {
        var pWeapon = 0;
        for(i in aWeaponsKeys) {
            pWeapon = weapons[aWeaponsKeys[i]].counter / iTotalPlays;
            if (pWeapon >= 0.60) {
                return aWeaponsKeys[i];
            }
        }
        return false;
    };

    /*
     * Based on the percentage of the player's plays, chooses computer's next play
     */
    var choosePlay = function (playerTendency) {
        //Finds the weapon that beats the player tendency
        for(i in aWeaponsKeys) {
            if (weapons[aWeaponsKeys[i]].beats.indexOf(playerTendency) >= 0) {
                return aWeaponsKeys[i];
            }
        }
    };

    /*
     * Sets the game mode to best of five of normal
     * bestOfFive true - playing Best of Five
     * bestOfFive false - playing Normal Mode
     */
    var setBestOfFive = function (bestOfFive) {
        lBestOfFive = bestOfFive;
    };

    var getBestOfFive = function () {
        return lBestOfFive;
    };

    /*
     * Reset game
     */
    var resetGame = function () {
        iPlayer1Score = 0;
        iPlayer2Score = 0;
        iTieScore = 0;
        for(i in aWeaponsKeys) {
            weapons[aWeaponsKeys[i]].counter = 0;
        }
    };

    /*
     * Returns game's scores
     */
    var getScores = function () {
        var scores = new Object();
        scores.player1Score = iPlayer1Score;
        scores.player2Score = iPlayer2Score;
        scores.tieScore = iTieScore;
        return scores;
    };

    /*
     * Sets game's mode
     */
    var setGameMode = function (gameMode) {
        iGameMode = gameMode;
    };

    /*
     * Returns game's mode
     */
    var getGameMode = function () {
        return iGameMode;
    };

    /*
     * Sets game's symbols mode
     */
    var setGameSymbolsMode = function (gameSymbolsMode) {
        iGameSymbolsMode = gameSymbolsMode;
    };

    /*
     * Returns game's symbols mode
     */
    var getGameSymbolsMode = function () {
        return iGameSymbolsMode;
    };

    return {
        play: play,
        resetGame: resetGame,
        getScores: getScores,
        setBestOfFive: setBestOfFive,
        getBestOfFive: getBestOfFive,
        setGameMode: setGameMode,
        getGameMode: getGameMode,
        setGameSymbolsMode: setGameSymbolsMode,
        getGameSymbolsMode: getGameSymbolsMode,
        //The functions below need to be public because of tests
        compareWeapons: compareWeapons,
        checkPlayerTendencies: checkPlayerTendencies
    }

})();

/*================================UI's JavaScript===============================================*/
var interval;

//Buttons
var btnSwitchGameMode = document.getElementById("switch-game-mode-btn");
var btnSwitchGameSymbols = document.getElementById("switch-game-symbols-btn");

//Score's elements
var player1ScoreBox = document.getElementById("player1-score");
var player1ScoreName = document.getElementById("player1-score-name");
var player2ScoreBox = document.getElementById("player2-score");
var player2ScoreName = document.getElementById("player2-score-name");
var tieScoreBox = document.getElementById("tie-score");

//Choice's and result's elements
var resultMessage = document.getElementById("result-msg");
var player1ChoiceImage = document.getElementById("player1-choice-img");
var player2ChoiceImage = document.getElementById("player2-choice-img");
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

/*
 * Execute a play
 */
function play(playerChoice){
    var result = rockPaperScissors.play(playerChoice);
    writeResult(result.player1Choice, result.player2Choice, result.winner);
    updateScores();
    if (result.winnerBoF) {
        //Without interval, the confirm box appears before the last result be written on UI
        interval = setInterval(function () {
            if (confirm(result.winnerBoF+" won the best of five! Play again?")) {
                resetGame();
            } else {
                resetGame(false);
            }
        }, 500);
    }
}

/*
 * Writes player choices on UI and post the result
 */
function writeResult(player1Choice, player2Choice, winner) {
    //Sets the choices images
    player1ChoiceImage.src = rockPaperScissors.getGameSymbolsMode() == 1 ? "assets/img/"+player1Choice+"-hand.png" :
                              "assets/img/"+player1Choice+"-symbol.png";
    player2ChoiceImage.src = rockPaperScissors.getGameSymbolsMode() == 1 ? "assets/img/"+player2Choice+"-hand.png" :
                              "assets/img/"+player2Choice+"-symbol.png";
    //Show the names
    player1Name.style.visibility = "visible";
    player2Name.style.visibility = "visible";

    if (winner == 1) {
        resultMessage.style.color = "green";
        resultMessage.innerHTML = rockPaperScissors.getGameMode() == 1 ? "You won!" : "Computer 1 won!";
    } else if (winner == 2) {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = rockPaperScissors.getGameMode() == 1 ? "You lost :(" : "Computer 2 won!";
    } else {
        resultMessage.style.color = "black";
        resultMessage.innerHTML = "Hmm... that's a tie!";
    }
}

/*
 * Update scores
 */
function updateScores() {
    var scores = rockPaperScissors.getScores();
    player1ScoreBox.innerHTML = scores.player1Score;
    player2ScoreBox.innerHTML = scores.player2Score;
    tieScoreBox.innerHTML = scores.tieScore;
}

/*
 * Set scores to zero and update them on UI
 */
function resetGame(bestOfFive) {
    if (bestOfFive == false) {
        rockPaperScissors.setBestOfFive(false);
        checkGameMode();
    }
    if (interval) {
        clearInterval(interval);
    }
    rockPaperScissors.resetGame();
    player1ChoiceImage.src = "";
    player2ChoiceImage.src = "";
    player1Name.style.visibility = "hidden";
    player2Name.style.visibility = "hidden";
    resultMessage.innerHTML = "";
    updateScores();
}

//GAME MENU

/*
 * Switch to Player vs Computer or Computer vs Computer
 */
function switchGameMode(bestOfFive) {
    if (bestOfFive) {
        rockPaperScissors.setGameMode(1);
        rockPaperScissors.setBestOfFive(true);
    } else {
        rockPaperScissors.setGameMode(rockPaperScissors.getGameMode() == 1 ? 2 : 1);
        rockPaperScissors.setBestOfFive(false);
    }
    resetGame();
    checkGameMode();
}

function checkGameMode() {
    //Player vs. Computer
    if (rockPaperScissors.getGameMode() == 1) {
        player1Name.innerHTML = "Player";
        player2Name.innerHTML = "Computer";
        player1ScoreName.innerHTML = "Player";
        player2ScoreName.innerHTML = "Computer";
        btnSwitchGameMode.innerHTML = "Switch to Computer vs. Computer (Simulation mode)";
        gamePvCTitle.innerHTML = rockPaperScissors.getBestOfFive() == true ? "Best of Five: Make your choice!" : "Make your choice!";
        divPlayerVsComputer.style.display = "block";
        divComputerVsComputer.style.display = "none";
    //Computer vs. Computer
    } else {
        player1Name.innerHTML = "Computer 1";
        player2Name.innerHTML = "Computer 2";
        player1ScoreName.innerHTML = "Computer 1";
        player2ScoreName.innerHTML = "Computer 2";
        btnSwitchGameMode.innerHTML = "Switch to Player vs. Computer";
        gameCvCTitle.innerHTML = "Computer vs. Computer";
        divPlayerVsComputer.style.display = "none";
        divComputerVsComputer.style.display = "block";
    }
}

/*
 * Switch to hands symbols mode or objects symbols mode
 */
function switchGameSymbols() {
    rockPaperScissors.setGameSymbolsMode(rockPaperScissors.getGameSymbolsMode() == 1 ? 2 : 1);
    return checkGameSymbols();
}

function checkGameSymbols() {
    //Hands symbols
    if (rockPaperScissors.getGameSymbolsMode() == 1) {
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

document.addEventListener("DOMContentLoaded", function () {
    checkGameMode();
    checkGameSymbols();
}, false);