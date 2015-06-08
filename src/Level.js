Level = function (game, id, back, mid, front, ground) {
	this.width = game.width;

	// Init parallax background and ground
	this.back = game.add.sprite(0, 0, back);

	this.mid = game.add.sprite(0, 0, mid);
	game.physics.enable(this.mid, Phaser.Physics.ARCADE);

	this.front = game.add.sprite(0, 0, front);
	game.physics.enable(this.front, Phaser.Physics.ARCADE);

	this.ground = game.add.sprite(0, 0, ground);
	game.physics.enable(this.ground, Phaser.Physics.ARCADE);

	this.update = function (playerPos, playerVel) {
		var scrollSpeed = -playerVel.x;
		if (playerPos.x >= this.width / 2) {

			// not 100 % correct, needs to be fixed to "line up"
			this.mid.body.velocity.x = scrollSpeed / 3.0;
			this.front.body.velocity.x = scrollSpeed / 2.0;
			this.ground.body.velocity.x = scrollSpeed;

			playerPos.x = this.width / 2;
		} else {
			this.mid.body.velocity.x = 0;
			this.front.body.velocity.x = 0;
			this.ground.body.velocity.x = 0;
		}
	}
}