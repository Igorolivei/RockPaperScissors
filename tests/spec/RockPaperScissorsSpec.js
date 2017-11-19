describe("RockPaperScissors", function() { 
	var player1Choice;
	var player2Choice;

	describe("when a player plays", function () {
		it("should know that rock beats scissors", function() {
			player1Choice = 'rock';
			player2Choice = 'scissors';
			expect(rockPaperScissors.compareWeapons(player1Choice, player2Choice)).toEqual(1);
		});
		
		it("should know that paper beats rock", function() {
			player1Choice = 'rock';
			player2Choice = 'paper';
			expect(rockPaperScissors.compareWeapons(player1Choice, player2Choice)).toEqual(2);
		});
		
		it("should know that scissors beats paper", function() {
			player1Choice = 'paper';
			player2Choice = 'scissors';
			expect(rockPaperScissors.compareWeapons(player1Choice, player2Choice)).toEqual(2);
		});

		it("should know that equal weapons result in a tie", function() {
			player1Choice = 'paper';
			player2Choice = 'paper';
			expect(rockPaperScissors.compareWeapons(player1Choice, player2Choice)).toEqual(0);

			//to test when it fails: expect(rockPaperScissors.compareWeapons(player1Choice, player2Choice)).toEqual(1);
		});
	});

	describe("after some plays", function() {
		
		// beforeEach(function() {
		// 	rockPaperScissors.resetGame();
	 //    });

		it("should know if the player has a tendency to play a specific weapon and say which one it is", function() {
			//In this point, rock has been played approximately in 66% of the plays
			rockPaperScissors.play('paper');
			rockPaperScissors.play('rock');
			rockPaperScissors.play('rock');
			expect(rockPaperScissors.checkPlayerTendencies()).toEqual('rock');
		
			//In this point, paper has been played approximately in 55% of the plays, so, it is not considered a tendency of play
			rockPaperScissors.play('paper');
			rockPaperScissors.play('rock');
			rockPaperScissors.play('paper');
			rockPaperScissors.play('rock');
			rockPaperScissors.play('paper');
			rockPaperScissors.play('paper');
			expect(rockPaperScissors.checkPlayerTendencies()).toEqual(false);
			
			//In this point, paper has been played approximately in 63% of the plays
			rockPaperScissors.play('scissors');
			rockPaperScissors.play('paper');
			rockPaperScissors.play('rock');
			rockPaperScissors.play('paper');
			rockPaperScissors.play('paper');
			rockPaperScissors.play('paper');
			rockPaperScissors.play('scissors');
			rockPaperScissors.play('paper');
			rockPaperScissors.play('paper');
			rockPaperScissors.play('paper');
			expect(rockPaperScissors.checkPlayerTendencies()).toEqual('paper');
		});
	});
});
