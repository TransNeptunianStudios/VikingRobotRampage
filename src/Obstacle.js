Obstacle = function (game, id, type, x, y) {
	switch (type) {
	case 'stone':
		Phaser.Sprite.call(this, game, x, y, 'stone');
		break;
	default:
		Phaser.Sprite.call(this, game, x, y, 'stone');
	}

	this.type = type;
	game.add.existing(this);
}
Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;