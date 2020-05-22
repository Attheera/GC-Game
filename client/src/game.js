import Business from './business.js';
import Shop from './shop.js';
import { convertNumber } from './convert.js';
import { max_business } from './config.js';

export default class Game { 
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.max_business = max_business;
        this.current_timestamp = 0;
        this.businesses = [];

        this.img_coin = new Image();
        this.img_coin.src = '../client/assets/images/coin.png';
        this.icon_shop = new Image();
        this.icon_shop.src = '../client/assets/images/icon_shop.png';
        this.bg_game = new Image();
        this.bg_game.src = '../client/assets/images/bg_game.png';
        this.balance = 20000;

        this.balance_x = 155;
        this.balance_y = 50;
        this.coin_width = 60;
        this.coin_height = 60;
        this.font_balance = '28px Arial';


        this.btn_shop_x = 370;
        this.btn_shop_y = 510;
        this.btn_shop_width = 60;
        this.btn_shop_height = 60;

        for (let i = 0 ; i < this.max_business ; i++) {
            this.businesses.push ( new Business(this, i));
        }
        this.shop = new Shop(this);
        this.isOpenShop = false;
        
    }
    input({ x, y }) {
        if (this.isOpenShop) {
            this.shop.onClick(x, y);
        } else {
            this.businesses.forEach(function(business) {
                business.onClick(x, y);
            });
        }
        if (y > this.btn_shop_y && y < this.btn_shop_y + this.btn_shop_height 
            && x > this.btn_shop_x && x < this.btn_shop_x + this.btn_shop_width) {
                this.isOpenShop = !this.isOpenShop;
        }
    }
    update(timeStamp) {
        this.current_timestamp = timeStamp;
        this.businesses.forEach(business => business.update(timeStamp));
        if (this.isOpenShop) {
            this.shop.update(timeStamp);
        }
    }
    draw(ctx) {
        ctx.fillStyle = "black";
        
        ctx.drawImage(this.bg_game, 0, 0, this.gameWidth, this.gameHeight);

        this.businesses.forEach(business => business.draw(ctx));

        if (this.isOpenShop) {
            this.shop.draw(ctx);
        }

        ctx.textAlign = "left";
        ctx.drawImage(this.img_coin, this.balance_x - 70, this.balance_y - 40, this.coin_width, this.coin_height );
        ctx.font = this.font_balance;
        ctx.fillText(convertNumber(this.balance), this.balance_x, this.balance_y);

        ctx.drawImage(this.icon_shop, this.btn_shop_x, this.btn_shop_y, this.btn_shop_width, this.btn_shop_height );

    }
    updateBalance(amount) {
        this.balance += amount;
    }
}