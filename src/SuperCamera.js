SuperCamera = function (player, game) {
	this.camera = game.camera;
	this.player = player;
	this.worldWidth = game.world.width;

	// camera setup
	this.camera.deadzone = new Phaser.Rectangle(50, 0, (game.width / 2) - 50, 0);
	this.camera.follow(player);

	// if the player is on the left side...
	this.isScrollingLeft = function () {
		var threshold = this.camera.x + this.camera.deadzone.x;

		if (this.player.isMovingHorz && this.camera.x > 0 && Math.floor(this.player.x) <= threshold)
			return true;

		return false;
	}

	// if the player is on the right side...
	this.isScrollingRight = function () {
		var threshold = this.camera.x + this.camera.deadzone.x + this.camera.deadzone.width;

		if (this.player.isMovingHorz && (this.camera.x + this.camera.width) < this.worldWidth && this.player.x >= threshold)
			return true;

		return false;
	}
}