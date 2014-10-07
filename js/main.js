/*jslint maxlen: 80, plusplus: true */

const DEFAULT_SIZE = new PIXI.Point(486, 864);
const HUD = new PIXI.Rectangle(0, 0, 486, 20);
var mapPlace = new PIXI.Rectangle(
	0, HUD.height,
	DEFAULT_SIZE.x, DEFAULT_SIZE.y - HUD.height
);
/// mapSize: default map size (tiles x tiles)
var mapSize = new PIXI.Point(4, 4);
var tileSize = new PIXI.Point(
	Math.floor(mapPlace.width/mapSize.x),
	Math.floor(mapPlace.height/mapSize.y)
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
        preload: preload,
        create: create,
        update: update,
        render: render
    }
);

var keyboard;

var tilemap;

/** 
	@brief Just a color data struct (carrier)
	@param[i] r, g, b RGB color system components
*/
function Color(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

/** 
	@brief Converts tile coords to mapPlace pixels
	@param[i] pos
	@return Returns x, y coords in pixels
*/
game.tileToXY = function(pos) {
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
	
	bitmapData = game.make.bitmapData(tileSize.x, tileSize.y);
	bitmapData.fill(color.r, color.g, color.b, color.a);
	/*bitmapData.rect(	
		x*tileSize.x, y*tileSize.y,
		tileSize.x, tileSize.y
	);*/
	
	this.sprite = game.add.sprite(
		x*tileSize.x, y*tileSize.y,
		tileSize.x, tileSize.y
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
				new Color(52, 73, 94)
			));
        }
		tilemap.push(newRow);
    }
}

function logic() {
    // NOTHING HERE YET! @TODO
}

function preload() {
    // PRELOAD PLACEHOLDERS @TODO
	/*
	game.load.image('tank', 'assets/tank.png');
    game.load.image('tile', 'assets/tile.png');
	*/
}

function create() {
	game.stage.backgroundColor = '#f1c40f';
    // Init controls
    keyboard = game.input.keyboard;

    initTilemap();
}

function update() {
    logic();
}

function render() {}