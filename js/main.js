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
    Phaser.AUTO,
    'game', {
        create: create,
        update: update
    }
);

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

function prepareLevel() {
	initTilemap(mapPlace, mapSize);
}