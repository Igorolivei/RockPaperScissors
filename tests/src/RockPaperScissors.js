function compareWeapons(player1Choice, player2Choice) {

    if (player1Choice == player2Choice) {
        return 0;
    }

    if (player1Choice == "rock") {
    	if (player2Choice == "scissors") { 
            return 1;         
        }
        else {
            return 2;
        }
    }
    
    if (player1Choice == "paper") { 	
        if (player2Choice == "rock") {
            return 1;
        }
        else {
            return 2;
        }
    }

    if (player1Choice == "scissors") {    
        if (player2Choice == "rock") {
            return 2;
        }
        else {
            return 1;
        }
    }
}