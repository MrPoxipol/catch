/*jslint maxlen: 80, plusplus: true */

const DEFAULT_SIZE = new PIXI.Point(486, 864);
const HUD = new PIXI.Rectangle(0, 0, 486, 50);
var hudText;

var mapPlace = new PIXI.Rectangle(
	0, HUD.height,
	DEFAULT_SIZE.x, DEFAULT_SIZE.y - HUD.height
);
/// mapSize: default map size (tiles x tiles)
var mapSize = new PIXI.Point(4, 7);

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
	// temporary! @todo
	game.stage.backgroundColor = '#34495e';
	// add hud text ('red' is a placeholder at the moment)
	hudText = game.add.text(0, 5, 'RED', {
		font: "35px 'oswald-regular'", fill: "#fff"
	});
	hudText.x = (HUD.width/2) - (hudText.width/2);

    initTilemap(mapPlace, mapSize);
}

function update() {
    logic();
}

function render() {}