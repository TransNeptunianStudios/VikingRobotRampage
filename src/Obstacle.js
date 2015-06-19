Obstacle = function (game, id, type, x, y) {
	switch (type) {
	case 'stone':
		Phaser.Sprite.call(this, game, x, y, 'stone');
		break;
	case 'rune':
		Phaser.Sprite.call(this, game, x, y, 'rune');
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