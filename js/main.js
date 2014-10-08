/*jslint maxlen: 80, plusplus: true */

/** 
	@brief Just a color data struct (carrier)
	@param[i] r, g, b RGB color system components
*/
function Color(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

const DEFAULT_SIZE = new PIXI.Point(486, 864);
const HUD = new PIXI.Rectangle(0, 0, 486, 40);

var mapPlace = new PIXI.Rectangle(
	0, HUD.height,
	DEFAULT_SIZE.x, DEFAULT_SIZE.y - HUD.height
);
/// mapSize: default map size (tiles x tiles)
var mapSize = new PIXI.Point(5, 9);
var tileSize = new PIXI.Point(
	Math.ceil(mapPlace.width/mapSize.x),
	Math.ceil(mapPlace.height/mapSize.y)
);

// Print some debug
console.log('mapPlace: %d,%d %dx%d',
			mapPlace.x, mapPlace.y,
			mapPlace.width, mapPlace.height
		   );
console.log('tileSize: %dx%d', tileSize.x, tileSize.y);

/* Singleton class, contains all avaiable colors for tiles,
 * and method to randomize selection
*/
var T_COLORS = {
	colors: [
		new Color(52, 73, 94),
		new Color(155, 89, 182),
		new Color(26, 188, 156),
		new Color(41, 128, 185),
		new Color(211, 84, 0),
		new Color(231, 76, 60),
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

var game = new Phaser.Game(DEFAULT_SIZE.x,
    DEFAULT_SIZE.y,
    Phaser.AUTO,
    'game', {
        create: create,
        update: update,
        render: render
    }
);

var tilemap;
/** 
	@brief Converts tile coords to mapPlace pixels
	@param[i] pos
	@return Returns x, y coords in pixels
*/
game.tileToXY = function(pos, tileSize) {
	var res = {
		x: pos.x*tileSize.x,
		y: mapPlace.y + pos.y*tileSize.y
	};
	
	return res;
};

/**
	@brief Creates a new tile filled with given color
	@param[i] game  A Phaser.Game instance
	@param[i] pos   Tile position on tile map
	@param[i] color A color, which the tile will be filled with
*/
function Tile(game, pos) {
	if (!pos) pos = PIXI.Point(0, 0);
	
	this.x = pos.x; this.y = pos.y;
	
	this.realPos = game.tileToXY(pos, tileSize);

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

function initTilemap() {
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

function logic() {
    // NOTHING HERE YET! @TODO
}

function create() {
	game.stage.backgroundColor = '#f1c40f';

    initTilemap();
}

function update() {
    logic();
}

function render() {}