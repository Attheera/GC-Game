import Game from './game.js';

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

let game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);

canvas.addEventListener('click', function(event) {
    game.input(event);
}, false);

function gameLoop(timeStamp) {
    ctx.fillStyle = "blue";
    ctx.clearRect(0,0,SCREEN_WIDTH, SCREEN_HEIGHT);
    game.update(timeStamp);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);