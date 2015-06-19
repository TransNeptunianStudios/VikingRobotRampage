Level = function (game, jsonInfo) {

	this.game = game;

	this.active = false;
	this.readyToGo = false;

	this.obstacles = [];
	this.farBack = jsonInfo.FarBack;
	this.back = jsonInfo.Back;
	this.front = jsonInfo.Front;
	this.ground = jsonInfo.Ground;

	this.playerStart = {
		x: 130,
		y: 200
	}

	this.start = function () {
		// Init parallax background and ground
		this.farBack = game.add.sprite(0, 0, this.farBack);
		this.back = game.add.tileSprite(0, 0, game.width, game.height, this.back);
		this.front = game.add.tileSprite(0, 0, game.width, game.height, this.front);
		this.ground = game.add.sprite(0, 0, this.ground);

		this.length = this.ground.width;

		this.farBack.fixedToCamera = true;
		this.back.fixedToCamera = true;
		this.front.fixedToCamera = true;

		this.game.world.alpha = 0;
		this.fadeTo(1, 2000, 0);

		this.active = true;
	}

	this.end = function () {
		this.active = false;

		var fadetime = Phaser.Timer.SECOND * 1;

		this.fadeTo(0, fadetime, 0);
		game.time.events.add(fadetime + 2000, function () {
			this.readyToGo = true;
		}, this);
	}

	this.kill = function () {
		this.farBack.kill();
		this.back.kill();
		this.front.kill();
		this.ground.kill();

		this.obstacles.forEach(function (item) {
			// should be tweaked a lot
			item.kill();
		}, this);
	}

	this.fadeTo = function (alpha, dt, to) {

		var fade = this.game.add.tween(this.game.world).to({
			alpha: alpha
		}, dt, Phaser.Easing.Linear.None, false, to);

		fade.start();
	}

	this.update = function (camera) {
		if (!this.active)
			return;

		// Forward Scroll (( doesnt work when player reaches end....
		if (camera.isScrollingRight()) {
			this.back.tilePosition.x -= 0.3;
			this.front.tilePosition.x -= 0.5;
		}

		// Backward Scroll
		if (camera.isScrollingLeft()) {
			this.back.tilePosition.x += 0.3;
			this.front.tilePosition.x += 0.5;
		}
	}

	this.addObstacles = function (obstacles) {
		this.obstacles.push(obstacles);
	}

	this.isCompleted = function (player) {
		return this.active && player.x >= (this.length - 100);
	}
}