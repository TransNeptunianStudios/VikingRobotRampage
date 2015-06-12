VikingGame.Game = function (game) {};

VikingGame.Game.prototype = {
	create: function () {

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(0, 0, 1600, this.game.height);
		this.game.physics.arcade.setBounds(0, 100, 1600, this.game.height - 120);

		this.levels = this.importLevels();
		this.currentLevel = this.levels[0];

		// Group for all things on the game board
		this.onBoardStuff = this.game.add.group();

		this.player = new Player(this.game, 130, 170);
		this.onBoardStuff.add(this.player);

		this.superCamera = new SuperCamera(this.player, this.game);
	},
	update: function () {
		this.currentLevel.update(this.superCamera);

		this.onBoardStuff.forEach(function (item) {
			// should be tweaked a lot
			var perspective = 0.7 + (item.y / this.game.height);
			item.scale.setTo(perspective);
		}, this);
	},
	importLevels: function () {
		var levels = [];
		levels.push(new Level(this.game, 1, 'himmel', 'fjall', 'skog', 'ground'));
		return levels;
	},
	render: function () {
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}

};