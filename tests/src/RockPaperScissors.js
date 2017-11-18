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