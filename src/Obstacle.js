Obstacle = function (game, id, type, x, y, player) {
	this.game = game;
	this.type = type;
	this.player = player;

	switch (this.type) {
	case 'stone':
		Phaser.Sprite.call(this, game, x, y, 'stone');
		break;
	case 'rune':
		Phaser.Sprite.call(this, game, x, y, 'rune');
		break;
	case 'sword viking':
		Phaser.Sprite.call(this, game, x, y, 'sword viking');
		this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 14, true);
		this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 14, true);
		this.frame = 1;

		game.physics.arcade.enable(this);
		this.kickingAss = false;

		this.movingAround = Trait.prototype.movingAround;
		this.Ai = Trait.prototype.swordViking;

		break;
	default:
		Phaser.Sprite.call(this, game, x, y, 'stone');
	}

	this.anchor.setTo(0.5, 1);
	this.type = type;

	game.add.existing(this);
}
Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.update = function () {
	if (this.game.camera.x > this.x - this.game.width)
		this.kickingAss = true;

	if (this.kickingAss) {
		if (this.movingAround)
			this.movingAround();

		if (this.Ai)
			this.Ai();
	}
}