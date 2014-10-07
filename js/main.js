/*jslint maxlen: 80, plusplus: true */

const DEFAULT_SIZE= new PIXI.Point(864, 486);
/// mapSize: default map size (tiles x tiles)
var mapSize = new PIXI.Point(4, 4);

var game = new Phaser.Game(WIDTH,
    HEIGHT,
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

function initTilemap() {
    tilemap = [];
    for (var y = 0; y < mapSize.y; ++y) {
        var newRow = [];
        for (var x = 0; x < mapSize.x; ++x) {
            newRow.push(0);
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
    // Init controls
    keyboard = game.input.keyboard;

    initTilemap();
}

function update() {
    logic();
}

function render() {}