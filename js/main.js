/*jslint maxlen: 80, plusplus: true */

const DEFAULT_SIZE = new PIXI.Point(486, 864);

var mapPlace = new PIXI.Rectangle(
	0, hud.area.height,
	DEFAULT_SIZE.x, DEFAULT_SIZE.y - hud.area.height
);
/// mapSize: default map size (tiles x tiles)
var mapSize = new PIXI.Point(4, 7);

var game = new Phaser.Game(DEFAULT_SIZE.x,
	DEFAULT_SIZE.y,
	Phaser.WEBGL,
	'game', {
		create: create,
		update: update
	}
);

/// Contains states, etc.
var gameData = {};
gameData.targetColor = T_COLORS.random(game); // Just set by default for sure

function logic() {
	// NOTHING HERE YET! @TODO
}

function create() {
	// temporary! @todo
	game.stage.backgroundColor = '#34495e';
	hud.create(game);

	prepareLevel();
}

function update() {
	logic();
}

/**
 * @brief Starts next level preparations
 */
function prepareLevel() {
	randomizeTarget();

	// Set the HUD text
	hud.setText(gameData.targetColor.name.toUpperCase());
	initTilemap(mapPlace, mapSize, tileClicked);
}

/**
 *	@brief Randomizes the target color and sets the text on HUD
 */
function randomizeTarget() {
	var color = T_COLORS.random(game);

	while (color == gameData.targetColor) {
		color = T_COLORS.random(game);
	}

	if (tilemap)
		while (!T_COLORS.colorInTilemap(color, tilemap)) {
			color = T_COLORS.random(game);
		}


	gameData.targetColor = color;
}

/**
	@brief A callback function. Called when any tile on tilemap's clicked
 	@param color - A color to be compared to the gameData.targetColor
*/
function tileClicked(color) {
	if (gameData.targetColor == color) {
		prepareLevel();
	}
}
