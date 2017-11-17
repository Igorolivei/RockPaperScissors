describe("RockPaperScissors", function() { 
	var player1Choice;
	var player2Choice;

    beforeEach(function() {
      
    });

	it("should know that rock beats scissors", function() {
		player1Choice = 'rock';
		player2Choice = 'scissors';
		expect(compareWeapons(player1Choice, player2Choice)).toEqual(1);
	});
	
	it("should know that paper beats rock", function() {
		player1Choice = 'rock';
		player2Choice = 'paper';
		expect(compareWeapons(player1Choice, player2Choice)).toEqual(2);
	});
	
	it("should know that scissors beats paper", function() {
		player1Choice = 'paper';
		player2Choice = 'scissors';
		expect(compareWeapons(player1Choice, player2Choice)).toEqual(2);
	});

	it("should know that equal weapons result in a tie", function() {
		player1Choice = 'paper';
		player2Choice = 'paper';
		expect(compareWeapons(player1Choice, player2Choice)).toEqual(0);

		//to test when it fails: expect(compareWeapons(player1Choice, player2Choice)).toEqual(1);
	});
});
