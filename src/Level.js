Level = function (game, id, back, mid, front, ground) {

	this.game = game;
	this.active = false;
	this.readyToGo = false;

	this.playerStart = {
		x: 130,
		y: 200
	};

	this.start = function () {
		// Init parallax background and ground
		this.back = game.add.sprite(0, 0, back);
		this.mid = game.add.tileSprite(0, 0, game.width, game.height, mid);
		this.front = game.add.tileSprite(0, 0, game.width, game.height, front);
		this.ground = game.add.sprite(0, 0, ground);

		this.length = this.ground.width;

		this.back.fixedToCamera = true;
		this.mid.fixedToCamera = true;
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
			this.mid.tilePosition.x -= 0.3;
			this.front.tilePosition.x -= 0.5;
		}

		// Backward Scroll
		if (camera.isScrollingLeft()) {
			this.mid.tilePosition.x += 0.3;
			this.front.tilePosition.x += 0.5;
		}
	}

	this.isCompleted = function (player) {
		return this.active && player.x >= (this.length - 100);
	}
}