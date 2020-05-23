import { convertNumber } from './calculation.js';
export default class UI { 
    constructor(game){
        this.game = game; 

        this.balance_x = 155;
        this.balance_y = 50;
        this.coin_width = 60;
        this.coin_height = 60;
        this.font_balance = '28px Arial';

        this.btn_shop_x = 370;
        this.btn_shop_y = 510;
        this.btn_shop_width = 60;
        this.btn_shop_height = 60;

        this.bg_game = new Image();
        this.bg_game.src = '../client/assets/images/bg_game.png';
        this.img_coin = new Image();
        this.img_coin.src = '../client/assets/images/coin.png';
        this.icon_shop = new Image();
        this.icon_shop.src = '../client/assets/images/icon_shop.png';
    }
    draw(ctx) {
        ctx.textAlign = "left";
        ctx.drawImage(this.img_coin, this.balance_x - 70, this.balance_y - 40, this.coin_width, this.coin_height );
        ctx.font = this.font_balance;
        ctx.fillText(convertNumber(this.game.balance), this.balance_x, this.balance_y);

        ctx.drawImage(this.icon_shop, this.btn_shop_x, this.btn_shop_y, this.btn_shop_width, this.btn_shop_height );
    }
    onClick(x, y) {
        if (y > this.btn_shop_y && y < this.btn_shop_y + this.btn_shop_height 
            && x > this.btn_shop_x && x < this.btn_shop_x + this.btn_shop_width) {
                this.game.shop.isOpen = !this.game.shop.isOpen;
                if (this.game.s_click.duration > 0) { this.game.s_click.load(); }
                this.game.s_click.play();
        }
    }
}