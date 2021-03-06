var VikingGame = {};
VikingGame.Boot = function (game) {};

VikingGame.Boot.prototype = {
	preload: function () {
		// preload the loading indicator first before anything else
		this.load.image('preloaderBar', 'assets/Loading_bar.png');
	},
	create: function () {
		// set scale options

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);

		// To fix a choppy camera ( wierd as fck)
		this.game.renderer.renderSession.roundPixels = true;

		// start the Preloader state
		this.state.start('Preloader');
	}
};