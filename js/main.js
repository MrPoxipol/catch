/*jslint maxlen: 80, plusplus: true */

const DEFAULT_SIZE = new PIXI.Point(486, 864);
const HUD = new PIXI.Rectangle(0, 0, 486, 40);

var mapPlace = new PIXI.Rectangle(
	0, HUD.height,
	DEFAULT_SIZE.x, DEFAULT_SIZE.y - HUD.height
);
/// mapSize: default map size (tiles x tiles)
var mapSize = new PIXI.Point(5, 9);

var game = new Phaser.Game(DEFAULT_SIZE.x,
    DEFAULT_SIZE.y,
    Phaser.AUTO,
    'game', {
        create: create,
        update: update,
        render: render
    }
);

function logic() {
    // NOTHING HERE YET! @TODO
}

function create() {
	game.stage.backgroundColor = '#f1c40f';

    initTilemap(mapPlace, mapSize);
}

function update() {
    logic();
}

function render() {}