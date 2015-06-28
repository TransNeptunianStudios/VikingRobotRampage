VikingGame.Game = function (game) {};

VikingGame.Game.prototype = {
	create: function () {

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(0, 0, 1600, this.game.height);
		this.game.physics.arcade.setBounds(0, 100, 1600, this.game.height - 110);

		this.onBoardStuff = this.game.add.group();

		this.player = new Player(this.game, 120, 200);

		this.levels = [];
		this.importLevels();
		this.currentLevel = this.levels[0];
		this.currentLevel.start();

		// Group for all things on the game board
		this.onBoardStuff.add(this.player);

		this.GUI = new GUI(this.game, this.player.hp);

		this.superCamera = new SuperCamera(this.player, this.game);
	},
	update: function () {
		this.currentLevel.update(this.superCamera);
		this.player.update(this.currentLevel.obstacles);
		this.GUI.update(this.player.hp);

		if (this.currentLevel.isCompleted(this.player)) {
			this.currentLevel.end();
		} else if (this.currentLevel.readyToGo) {
			this.currentLevel.kill();
			this.levels.shift();
			this.currentLevel = this.levels[0];
			this.currentLevel.start();

			this.player.position.x = this.currentLevel.playerStart.x;
			this.player.position.y = this.currentLevel.playerStart.y;
		}

		this.onBoardStuff.forEach(function (item) {
			// should be tweaked a lot
			var perspective = 0.7 + (item.y / this.game.height);
			item.scale.setTo(perspective);
		}, this);

		this.game.world.bringToTop(this.onBoardStuff);
		this.onBoardStuff.sort('y', Phaser.Group.SORT_ASCENDING);

	},
	importLevels: function () {
		for (i in LevelsJson) {
			var lvlJson = LevelsJson[i];
			var level = new Level(this.game, lvlJson);

			var obst = []
			if (lvlJson.Obstacles) {
				lvlJson.Obstacles.forEach(function (item) {
					var obst = new Obstacle(this.game,
						lvlJson.Obstacles.length,
						item.type,
						item.x,
						item.y,
						this.player);

					this.game.physics.arcade.enable(obst);
					this.onBoardStuff.add(obst);
					level.addObstacles(obst);
				}, this);
			}
			this.levels.push(level);
		}
	},
	render: function () {
		//this.game.debug.text(this.game.time.fps, 2, 14, "#a7aebe");
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
	},

};