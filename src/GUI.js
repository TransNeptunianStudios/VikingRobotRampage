GUI = function (game) {
	Phaser.Group.call(this, game);

	this.hitpoints = game.add.graphics(0, 0);
	this.hitpoints.beginFill(0xFF0000, 1);
	this.hitpoints.drawRect(10, 10, 80, 10);

	this.hitpointsBack = game.add.graphics(0, 0);
	this.hitpointsBack.lineStyle(1, 0x000000, 1);
	this.hitpointsBack.drawRect(10, 10, 80, 10);

	this.add(this.hitpointsBack);
	this.add(this.hitpoints);
}

GUI.prototype = Object.create(Phaser.Group.prototype);
GUI.prototype.constructor = GUI;

GUI.prototype.update = function (playerHp) {
	if (!playerHp) {
		console.log("PlayerHp not defined!");
		return;
	}

	this.hitpoints.clear();
	this.hitpoints.beginFill(0xFF0000, 1);
	this.hitpoints.drawRect(10, 10, 8 * playerHp, 10);

}