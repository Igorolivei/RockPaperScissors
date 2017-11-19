describe("RockPaperScissors", function() { 
	var player1Choice;
	var player2Choice;

	describe("when a player plays", function () {
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

	describe("after some plays", function() {
		
		beforeEach(function() {
			weapons['rock'].counter = 0;
	      	weapons['paper'].counter = 0;
			weapons['scissors'].counter = 0;
	    });

		it("should know when the player have a tendency to play a specific weapon and say which one it is", function() {
			//In this case, rock has been played approximately in 66% of the plays
			totalPlays = 3;
			weapons['paper'].counter++;
			weapons['rock'].counter++;
			weapons['rock'].counter++;
			expect(checkPlayerTendencies()).toEqual('rock');
		});

		it("should know when the player doesn't have a tendency to play a specific weapon", function() {
			//In this case, scissors has been played approximately in 50% of the plays, so, it is not considered a tendency of play
			totalPlays = 6;
			weapons['paper'].counter++;
			weapons['rock'].counter++;
			weapons['scissors'].counter++;
			weapons['rock'].counter++;
			weapons['scissors'].counter++;
			weapons['scissors'].counter++;
			expect(checkPlayerTendencies()).toEqual(false);
		});

		it("should know when the player have a tendency to play a specific weapon after a few plays", function() {
			//In this case, paper has been played approximately in 60% of the plays
			totalPlays = 10;
			weapons['scissors'].counter++;
			weapons['paper'].counter++;
			weapons['rock'].counter++;
			weapons['paper'].counter++;
			weapons['rock'].counter++;
			weapons['paper'].counter++;
			weapons['scissors'].counter++;
			weapons['paper'].counter++;
			weapons['paper'].counter++;
			weapons['paper'].counter++;
			expect(checkPlayerTendencies()).toEqual('paper');
		});
	});
});
