/* Singleton class, contains all avaiable colors for tiles,
 * and method to randomize selection
*/
var T_COLORS = {
	colors: [
		new TileColor(new rgb(242, 38, 19), "red"),
		new TileColor(new rgb(34, 167, 240), "blue"),
		new TileColor(new rgb(246, 36, 89), "light red"),
		new TileColor(new rgb(145, 61, 136), "purple"),
		new TileColor(new rgb(46, 204, 113), "light green"),
		new TileColor(new rgb(247, 202, 24), "light orange"),
		new TileColor(new rgb(249, 105, 14), "orange"),
		new TileColor(new rgb(149, 165, 166), "gray")
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
		if (left.color === color) return false;
	}
	if (top) {
		if (top.color === color) return false;
	}

	return true;	
};

T_COLORS.randomize = function(game, tilePos, tilemap) {
	if (!game) throw "game object is undefined";
	if (!tilemap) throw "tilemap object is undefined";

	var color = this.random(game);
	// Check that these adjacent tiles aren't in the same color
	while (!this._isDiffrent(tilePos, color, tilemap)) {
		color = this.random(game);
	}

	return color;
};

/**
	@brief Returns a random color from T_COLORS.colors array
	@returns A rgb object
*/
T_COLORS.random = function(game) {
	if (!game) throw "game object is undefined";
	var colorIndex = game.rnd.between(0, this.colors.length-1);

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
function Tile(game, pos, mapPlace, clickCallback) {
	if (!pos) pos = PIXI.Point(0, 0);

	this.x = pos.x; this.y = pos.y;

	this.realPos = tileToXY(pos, mapPlace, tileSize);

	this.color = undefined;
	this.bitmapData = game.make.bitmapData(tileSize.x, tileSize.y);

	this.sprite = game.add.sprite(
		this.realPos.x, this.realPos.y,
		this.bitmapData.texture
	);

	// Event handlers
	this.onClick = function (){};
	if (clickCallback) this.onClick = clickCallback;

	// Configure events
	this.onInputOver = function(sprite, pointer) {
		sprite.alpha = 0.5;
	};
	this.onInputOut	= function(sprite, pointer) {
		sprite.alpha = 1;
	};
	this.onInputDown = function(sprite, pointer) {
		this.onClick(this.color);
	};

	this.sprite.inputEnabled = true;
	this.sprite.events.onInputOver.add(this.onInputOver, this);
	this.sprite.events.onInputOut.add(this.onInputOut, this);
	this.sprite.events.onInputDown.add(this.onInputDown, this);

	this.setColor = function(color) {
		this.color = color;
		this.bitmapData.fill(color.r, color.g, color.b);
	};
}

/** 
	@brief Converts tile coords to mapPlace pixels
	@param[i] pos
	@return Returns x, y coords in pixels
*/
function tileToXY(pos, mapPlace, tileSize) {
	var res = {
		x: pos.x*tileSize.x,
		y: mapPlace.y + pos.y*tileSize.y
	};

	return res;
}

function initTilemap(mapPlace, mapSize, tileClickedCallback) {
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
				new PIXI.Point(x, y),
				mapPlace,
				tileClickedCallback
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
