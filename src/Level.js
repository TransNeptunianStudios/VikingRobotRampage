Level = function (game, id, back, mid, front, ground) {
	this.width = game.width;
	this.progress = 0;
	this.camera = game.camera;

	// Init parallax background and ground
	this.back = game.add.sprite(0, 0, back);
	this.mid = game.add.tileSprite(0, 0, game.width, game.height, mid);
	this.front = game.add.tileSprite(0, 0, game.width, game.height, front);
	this.ground = game.add.sprite(0, 0, ground);

	this.update = function (playerPos, playerVel) {

		// Forward Scroll
		if (playerVel.x > 0 && playerPos.x >= (this.camera.x + this.width / 2)) {
			this.camera.x = playerPos.x - (this.width / 2);

			this.back.x = this.camera.x;

			this.mid.tilePosition.x -= 0.3;
			this.mid.x = this.camera.x;

			this.front.tilePosition.x -= 0.7;
			this.front.x = this.camera.x;
		}

		// Backward Scroll
		if (playerVel.x < 0 && playerPos.x <= this.camera.x) {
			this.camera.x = playerPos.x;
		}
	}
}