VikingGame.Game = function (game) {};

VikingGame.Game.prototype = {
	create: function () {

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(0, 0, 1600, this.game.height);

		// Level 1
		this.currentLevel = new Level(this.game, 1, 'himmel', 'fjall', 'skog', 'ground');

		// Group for all things on the game board
		this.onBoardStuff = this.game.add.group();

		this.player = new Player(this.game, 100, 200);
		this.onBoardStuff.add(this.player);
	},
	update: function () {
		this.currentLevel.update(this.player);

		this.onBoardStuff.forEach(function (item) {
			// should be tweaked a lot
			var perspective = 0.7 + (item.y / this.game.height);
			item.scale.setTo(perspective);
		}, this);
	},
	render: function () {
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}

};