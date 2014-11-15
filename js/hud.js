var hud = {};
hud.area = new PIXI.Rectangle(0, 0, 486, 50);

// Methods

/**
	@brief Initializes the HUD panel
	@param game - The MainGame object
*/
hud.create = function(game) {
	if (!game) throw('hud#create: The game object is undefined');

	// add hud text ('red' is a placeholder at the moment)
	this.text = game.add.text(0, 2, 'NONE', {
		font: "37px 'Raleway'", fill: "#fff"
	});
	// Center the text
	this.text.x = (this.area.width/2) - (this.text.width/2);
};

/**
	@brief Sets hud text.
	@param text - A String to be set
*/
hud.setText = function(text) {
	this.text.setText((text ? text : ''));
	this.text.x = (this.area.width/2) - (this.text.width/2);
};
