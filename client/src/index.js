import Game from './game.js';

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

let game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
game.checkUser();
function gameLoop(timeStamp) {
    ctx.clearRect(0,0,SCREEN_WIDTH, SCREEN_HEIGHT);
    game.update(timeStamp);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    game.input({x, y});
}, false);

var money = 100000;
window.addEventListener('keydown', function(event) {
    if (event.key == 'Escape') {
        game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
        game.restart();
    } else if (event.key == 'c') {
        game.updateBalance(money);
    } else if (event.key == ',') {
        money/=10;
    } else if (event.key == '.') {
        money*=10;
    }
}, true);