/* Singleton class, contains all avaiable colors for tiles,
 * and method to randomize selection
*/
var T_COLORS = {
	colors: [
		new Color(255, 0, 0),
		new Color(34, 167, 240),
		new Color(246, 36, 89),
		new Color(102, 51, 153),
		new Color(46, 204, 113),
		new Color(247, 202, 24),
		new Color(249, 105, 14),
		new Color(149, 165, 166)
	]
};

T_COLORS._isDiffrent = function(tilePos, color, tilemap) {
	if (!tilePos) 	tilePos = new PIXI.Point(0, 0);
	if (!color)		color	= this.colors[0];
	if (!tilemap || tilemap.length < 1)	throw "tilemap is undefined or empty";

	var left, top;
	if (tilePos.x-1 >= 0)
		left 	= tilemap[tilePos.y][tilePos.x-1];
	if (tilePos.y-1 >= 0)
		top		= tilemap[tilePos.y-1][tilePos.x];

	if (left) {
		if (left.color == color) return false;
	}
	if (top) {
		if (top.color == color) return false;
	}

	return true;	
}

T_COLORS.randomize = function(game, tilePos, tilemap) {
	if (!game) throw "game object is undefined";
	if (!tilemap) throw "tilemap object is undefined";

	var colorIndex = game.rnd.between(0, this.colors.length-1);
	// Check that these adjacent tiles aren't in the same color
	while(!this._isDiffrent(tilePos, this.colors[colorIndex], tilemap)) {
		colorIndex = game.rnd.between(0, this.colors.length-1);
	}

	return this.colors[colorIndex];
}

var tilemap;
var tileSize;

/**
	@brief Creates a new tile filled with given color
	@param[i] game  A Phaser.Game instance
	@param[i] pos   Tile position on tile map
	@param[i] color A color, which the tile will be filled with
*/
function Tile(game, pos) {
	if (!pos) pos = PIXI.Point(0, 0);

	this.x = pos.x; this.y = pos.y;

	this.realPos = tileToXY(pos, tileSize);

	this.color;
	this.bitmapData = game.make.bitmapData(tileSize.x, tileSize.y);

	this.sprite = game.add.sprite(
		this.realPos.x, this.realPos.y,
		this.bitmapData.texture
	);

	this.setColor = function(color) {
		this.color = color;
		this.bitmapData.fill(color.r, color.g, color.b, color.a);
	}
}

/** 
	@brief Converts tile coords to mapPlace pixels
	@param[i] pos
	@return Returns x, y coords in pixels
*/
function tileToXY(pos, tileSize) {
	var res = {
		x: pos.x*tileSize.x,
		y: mapPlace.y + pos.y*tileSize.y
	};

	return res;
};

function initTilemap(mapPlace, mapSize) {
	tileSize = new PIXI.Point(
		Math.ceil(mapPlace.width/mapSize.x),
		Math.ceil(mapPlace.height/mapSize.y)
	);
	
	tilemap = [];
	for (var y = 0; y < mapSize.y; ++y) {
		var newRow = [];
		for (var x = 0; x < mapSize.x; ++x) {
			newRow.push(new Tile(
				game,
				new PIXI.Point(x, y)
			));
		}
		tilemap.push(newRow);
	}

	// colorize tiles
	for (var y = 0; y < mapSize.y; ++y)
		for (var x = 0; x < mapSize.x; ++x) {
			tilemap[y][x].setColor(T_COLORS.randomize(
				game,
				new PIXI.Point(x, y),
				tilemap
			));
		}
}
