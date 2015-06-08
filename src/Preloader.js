VikingGame.Preloader = function (game) {
	VikingGame.WIDTH = 320;
	VikingGame.HEIGHT = 200;
};
VikingGame.Preloader.prototype = {
	preload: function () {
		// set background color and preload image
		this.stage.backgroundColor = '#000000';
		this.preloadBar = this.add.sprite((VikingGame.WIDTH - 311) / 2, (VikingGame.HEIGHT - 27) / 2, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		// load images
		this.load.image('himmel', 'assets/Himmel.png');
		this.load.image('fjall', 'assets/Fjall.png');
		this.load.image('skog', 'assets/Skog.png');
		this.load.image('ground', 'assets/Ground.png');

		this.load.spritesheet('player', 'assets/Player.png', 19, 32);

	},
	create: function () {
		// start the MainMenu state
		this.state.start('Game');
	}
};