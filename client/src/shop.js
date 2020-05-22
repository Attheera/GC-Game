import { max_manager } from './config.js';
import Manager from './manager.js';
export default class Shop { 
    constructor(game){
        this.game = game; 
        this.max_manager = max_manager;

        this.shop_bg = new Image();
        this.shop_bg.src = './client/assets/images/bg_shop.png';
        
        this.title = 'Manager';
        this.title_x = 650;
        this.title_y = 50;
        this.font_title = "30px Arial";

        this.managers = [];
        for (let i = 0 ; i < this.max_manager ; i++) {
            this.managers.push( new Manager(this.game, i));
        }
    }
    update(timeStamp) {
        this.managers.forEach(manager => manager.update(timeStamp));
    }
    draw(ctx) {
        ctx.drawImage(this.shop_bg, 0, 0, this.game.gameWidth, this.game.gameHeight );

        ctx.font = this.font_title;
        ctx.fillText(this.title, this.title_x, this.title_y);

        this.managers.forEach(manager => manager.draw(ctx));
    }
    onClick(x, y) {
        this.managers.forEach(manager => manager.onClick(x, y));
    }
}