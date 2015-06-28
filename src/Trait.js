// a bit of ai and a bit of other properties a entity can have

Trait = function () {}

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
	if (!this.lightAttack)
		this.lightAttack = Trait.prototype.lightAttack;
	if (!this.movingAround)
		this.movingAround = Trait.prototype.movingAround;

	if (this.game.camera.x > this.x - this.game.width)
		this.kickingAss = true;

	if (this.kickingAss) {
		this.movingAround();
		var dist = this.game.physics.arcade.distanceBetween(this, this.player);

		if (dist > 25)
			this.game.physics.arcade.moveToObject(this, this.player, 50);
		else {
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
			this.lightAttack(this.player);
		}
	}
}

Trait.prototype.lightAttack = function (enemies) {
	if (this.attacking)
		return;

	this.attacking = true;
	console.log("Attack!");

	if (enemies instanceof Phaser.Sprite)
		this.game.time.events.add(Phaser.Timer.SECOND * 1, lightAttackCompleted, this, enemies);
	else
		enemies.forEach(function (enemy) {
			this.game.time.events.add(
				Phaser.Timer.SECOND * 1,
				lightAttackCompleted,
				this,
				enemy);

		}, this);
}

lightAttackCompleted = function (enemy) {
	if (!this.alive) {
		enemy.destroy;
		return;
	}

	var boundsA = this.getBounds();
	var boundsB = enemy.getBounds();

	if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
		enemy.hp -= 1;

		if (!enemy.immovable)
			if (this.facingEast)
				enemy.position.x += 7;
			else
				enemy.position.x -= 7;

	}
	this.attacking = false;
}