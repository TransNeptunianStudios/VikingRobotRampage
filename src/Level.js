Level = function (game, id, back, mid, front, ground) {
	// Init parallax background and ground
	this.back = game.add.sprite(0, 0, back);
	this.mid = game.add.tileSprite(0, 0, game.width, game.height, mid);
	this.front = game.add.tileSprite(0, 0, game.width, game.height, front);
	this.ground = game.add.sprite(0, 0, ground);

	this.back.fixedToCamera = true;
	this.mid.fixedToCamera = true;
	this.front.fixedToCamera = true;

	this.update = function (camera) {
		// Forward Scroll (( doesnt work when player reaches end....
		if (camera.isScrollingRight()) {
			this.mid.tilePosition.x -= 0.3;
			this.front.tilePosition.x -= 0.5;
		}

		// Backward Scroll
		if (camera.isScrollingLeft()) {
			this.mid.tilePosition.x += 0.3;
			this.front.tilePosition.x += 0.5;
		}
	}
}