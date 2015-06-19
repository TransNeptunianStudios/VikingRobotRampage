Player = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'player');
	this.anchor.setTo(0.5, 1);

	this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 15, true);
	this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 15, true);
	this.frame = 2;

	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;

	this.cursors = game.input.keyboard.createCursorKeys();

	this.facingEast = true;

	game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function (game) {

}

Player.prototype.update = function () {
	this.isMovingHorz = false;
	this.isMovingVert = false;

	if (this.cursors.up.isDown) {
		this.body.velocity.y = -70;
		this.isMovingVert = true;
	} else if (this.cursors.down.isDown) {
		this.isMovingVert = true;
		this.body.velocity.y = 70;
	} else
		this.body.velocity.y = 0;

	if (this.cursors.left.isDown) {
		this.body.velocity.x = -70;
		this.facingEast = false;
		this.isMovingHorz = true;
	} else if (this.cursors.right.isDown) {
		this.body.velocity.x = 70;
		this.facingEast = true;
		this.isMovingHorz = true;
	} else
		this.body.velocity.x = 0;

	if (this.facingEast) {
		if (this.isMovingHorz || this.isMovingVert)
			this.animations.play('east');
		else
			this.frame = 3;
	} else {
		if (this.isMovingHorz || this.isMovingVert)
			this.animations.play('west');
		else
			this.frame = 1;
	}
};