Player = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'player');
	this.anchor.setTo(0.5, 1);

	this.animations.add('north', [4, 5, 6, 7, 8, 9, 10, 11], 15, true);
	this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 15, true);
	this.animations.add('south', [20, 21, 22, 23, 24, 25, 26, 27], 15, true);
	this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 15, true);
	this.frame = 2;

	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;

	this.cursors = game.input.keyboard.createCursorKeys();

	game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
	this.isMovingHorz = false;

	if (this.cursors.up.isDown)
		this.body.velocity.y = -70;
	else if (this.cursors.down.isDown)
		this.body.velocity.y = 70;
	else
		this.body.velocity.y = 0;

	if (this.cursors.left.isDown) {
		this.body.velocity.x = -70;
		this.animations.play('west');
		this.isMovingHorz = true;
	} else if (this.cursors.right.isDown) {
		this.body.velocity.x = 70;
		this.animations.play('east');
		this.isMovingHorz = true;
	} else
		this.body.velocity.x = 0;

	if (!this.isMovingHorz)
		this.frame = 3;
};