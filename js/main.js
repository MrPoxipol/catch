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
const HUD = new PIXI.Rectangle(0, 0, 486, 30);

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
	],
	
	randomize: function(game) {
		if (!game) throw "game object is undefined";
		
		var colorIndex = game.rnd.between(0, this.colors.length-1);
		
		return this.colors[colorIndex];
	}
};

var mapPlace = new PIXI.Rectangle(
	0, HUD.height,
	DEFAULT_SIZE.x, DEFAULT_SIZE.y - HUD.height
);
/// mapSize: default map size (tiles x tiles)
var mapSize = new PIXI.Point(4, 4);
var tileSize = new PIXI.Point(
	Math.round(mapPlace.width/mapSize.x),
	Math.round(mapPlace.height/mapSize.y)
);

// Print some debug
console.log('mapPlace: %d,%d %dx%d',
	mapPlace.x, mapPlace.y,
	mapPlace.width, mapPlace.height
);
console.log('tileSize: %dx%d', tileSize.x, tileSize.y);

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
function Tile(game, pos, color) {
	if (!pos) pos = PIXI.Point(0, 0);
	if (!color) color = new Color(0, 0, 0);
	
	this.x = pos.x; this.y = pos.y;
	
	this.realPos = game.tileToXY(pos, tileSize);
	this.bitmapData = game.make.bitmapData(tileSize.x, tileSize.y);
	//this.bitmapData = new Phaser.BitmapData(game, '', this.realPos.x, this.realPos.y);
	this.bitmapData.fill(color.r, color.g, color.b, color.a);
	
	this.sprite = game.add.sprite(
		this.realPos.x, this.realPos.y,
		this.bitmapData.texture
	);
}

function initTilemap() {
    tilemap = [];
    for (var y = 0; y < mapSize.y; ++y) {
        var newRow = [];
        for (var x = 0; x < mapSize.x; ++x) {
            newRow.push(new Tile(
				game,
				new PIXI.Point(x, y),
				T_COLORS.randomize(game)
			));
        }
		tilemap.push(newRow);
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