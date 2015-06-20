Obstacle = function (game, id, type, x, y, player) {
	this.game = game;
	this.type = type;
	this.player = player;

	switch (this.type) {
	case 'stone':
		Phaser.Sprite.call(this, game, x, y, 'stone');
		this.hp = 10;
		this.immovable = true;
		break;
	case 'rune':
		Phaser.Sprite.call(this, game, x, y, 'rune');
		this.hp = 7;
		this.immovable = true;
		break;
	case 'sword viking':
		Phaser.Sprite.call(this, game, x, y, 'sword viking');
		this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 14, true);
		this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 14, true);
		this.frame = 1;

		game.physics.arcade.enable(this);
		this.kickingAss = false;
		this.attacking = false;
		this.hp = 4;

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
		if (this.Ai)
			this.Ai();
	}

	if (this.hp <= 0)
		this.kill();
}