SuperCamera = function (player, game) {
	this.camera = game.camera;
	this.player = player;
	this.worldWidth = game.world.width;
	this.camera.follow(this.player);
	this.camera.deadzone = new Phaser.Rectangle(50, 0, game.width - 200, 0);

	// if the player is on the left side...
	this.isScrollingLeft = function () {
		if (!this.camera.deadzone)
			return false;

		var threshold = this.camera.x + this.camera.deadzone.x;

		if (this.player.isMovingHorz && this.camera.x > 0 && Math.floor(this.player.x) <= threshold)
			return true;

		return false;
	}

	// if the player is on the right side...
	this.isScrollingRight = function () {
		if (!this.camera.deadzone)
			return false;

		var threshold = this.camera.x + this.camera.deadzone.x + this.camera.deadzone.width;

		if (this.player.isMovingHorz && (this.camera.x + this.camera.width) < this.worldWidth && this.player.x >= threshold)
			return true;

		return false;
	}
}