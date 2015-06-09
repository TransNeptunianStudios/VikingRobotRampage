VikingGame.Game = function (game) {};

VikingGame.Game.prototype = {
	create: function () {

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.setBounds(0, 0, this.game.width, this.game.height);
		this.game.world.setBounds(0, 0, 2000, this.game.height);

		// Level 1
		this.currentLevel = new Level(this.game, 1, 'himmel', 'fjall', 'skog', 'ground');

		this.player = new Player(this.game, 100, 200);
	},
	update: function () {
		this.currentLevel.update(this.player.position, this.player.body.velocity);
	},
	render: function () {
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}

};