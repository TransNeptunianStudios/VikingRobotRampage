VikingGame.Game = function (game) {};

VikingGame.Game.prototype = {
	create: function () {

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(0, 0, 1600, this.game.height);
		this.game.physics.arcade.setBounds(0, 100, 1600, this.game.height - 120);


		this.levels = this.importLevels();
		this.currentLevel = this.levels[0];

		this.player = new Player(this.game, 130, 170);

		// Group for all things on the game board
		this.onBoardStuff = this.game.add.group();
		this.onBoardStuff.add(this.player);

		this.superCamera = new SuperCamera(this.player, this.game);

		this.currentLevel.start();
	},
	update: function () {
		this.currentLevel.update(this.superCamera);
		if (this.currentLevel.isCompleted(this.player)) {

		}


		this.onBoardStuff.forEach(function (item) {
			// should be tweaked a lot
			var perspective = 0.7 + (item.y / this.game.height);
			item.scale.setTo(perspective);
		}, this);
	},
	importLevels: function () {
		var levels = [];
		for (i in LevelsJson) {
			var lvl = LevelsJson[i];
			levels.push(new Level(this.game, lvl.nr, lvl.FarBack, lvl.Back, lvl.Front, lvl.Ground));
		}
		return levels;
	},
	render: function () {
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}

};