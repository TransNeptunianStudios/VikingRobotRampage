Level = function (game, id, back, mid, front, ground) {
	this.width = game.width;
	this.progress = 0;
	this.camera = game.camera;

	// Init parallax background and ground
	this.back = game.add.sprite(0, 0, back);
	this.mid = game.add.tileSprite(0, 0, game.width, game.height, mid);
	this.front = game.add.tileSprite(0, 0, game.width, game.height, front);
	this.ground = game.add.sprite(0, 0, ground);

	this.back.fixedToCamera = true;
	this.mid.fixedToCamera = true;
	this.front.fixedToCamera = true;

	this.update = function (player) {
		// Forward Scroll (( doesnt work when player reaches end....
		if (player.isMoving && player.body.velocity.x > 0 && this.camera.x != 0) {
			this.mid.tilePosition.x -= 0.3;
			this.front.tilePosition.x -= 0.5;
		}

		// Backward Scroll
		if (player.isMoving && player.body.velocity.x < 0 && this.camera.x != 0) {
			this.mid.tilePosition.x += 0.3;
			this.front.tilePosition.x += 0.5;
		}

		// update level progress
		if (player.x >= this.progress)
			this.progress = player.x;
	}
}