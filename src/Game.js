VikingGame.Game = function (game) {};

VikingGame.Game.prototype = {
	create: function () {

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.setBounds(0, 0, this.game.width, this.game.height);

		this.scrollSpeed = 1;

		this.back = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'himmel');
		this.mid = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'fjall');
		this.near = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'skog');

		this.player = this.game.add.sprite(100, this.game.world.height - 50, 'player');
		this.player.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 15, true);
		this.player.animations.play('east', 10, true);
	},

	update: function () {
		this.near.tilePosition.x -= this.scrollSpeed / 5;
		this.mid.tilePosition.x -= this.scrollSpeed / 10;
		this.back.tilePosition.x -= this.scrollSpeed / 20;
	}

};