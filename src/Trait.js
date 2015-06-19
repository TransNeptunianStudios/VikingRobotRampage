// a bit of ai and a bit of other properties a entity can have

Trait = function (game, player) {}

Trait.prototype.movingAround = function () {
	this.isMovingHorz = false;
	this.isMovingVert = false;

	if (this.body.velocity.y > 0)
		this.isMovingVert = true;
	else if (this.body.velocity.y < 0) {
		this.isMovingVert = true;
	}

	if (this.body.velocity.x < 0) {
		this.facingEast = false;
		this.isMovingHorz = true;
	} else if (this.body.velocity.x > 0) {
		this.facingEast = true;
		this.isMovingHorz = true;
	}

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
}

Trait.prototype.swordViking = function () {
	if (this.game.camera.x > this.x - this.game.width)
		this.kickingAss = true;

	if (this.kickingAss) {
		var dist = this.game.physics.arcade.distanceBetween(this, this.player);
		if (dist > 20)
			this.game.physics.arcade.moveToObject(this, this.player, 50);
		else {
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}

	}
}