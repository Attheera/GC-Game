import Business from './business.js';
import Shop from './shop.js';
import { convertNumber, calculateRemainTime } from './calculation.js';
import { max_business } from './config.js';

export default class Game { 
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.max_business = max_business;
        this.current_timestamp = 0;
        this.businesses = [];
        this.balance = 0;

        this.img_coin = new Image();
        this.img_coin.src = '../client/assets/images/coin.png';
        this.icon_shop = new Image();
        this.icon_shop.src = '../client/assets/images/icon_shop.png';
        this.bg_game = new Image();
        this.bg_game.src = '../client/assets/images/bg_game.png';

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
        if (this.isShowWB) {
            this.isShowWB = false;
            return;
        }
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
        this.saveUserData();
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

        if (this.isShowWB) {
            ctx.textAlign = "center";
            ctx.drawImage(this.bg_game, 0, 0, this.gameWidth, this.gameHeight);
            ctx.font = '50px Arial';
            ctx.fillText("Welcome Back!", 400,150);
            ctx.font = '30px Arial';
            ctx.fillText("You were away for " + calculateRemainTime(this.away_time), 400,300);
            ctx.font = '40px Arial';
            ctx.fillText("Receive: " + convertNumber(this.offline_revenue), 400, 350);
        }
    }
    updateBalance(amount) {
        this.balance = this.balance + amount;
    }
    checkUser () {
        let user_data = localStorage.getItem('user_data');
        if (!user_data) {
            let user_data = {
                user_id: new Date().getTime(),
                balance: 0,
            }
            localStorage.setItem("user_data", JSON.stringify(user_data));
            this.user_data = user_data;
        } else {
            this.loadUserData(JSON.parse(user_data));
            this.calcualteOfflineRevenue();
            this.away_time = new Date().getTime() - this.user_data.last_timestamp;
            if (this.away_time > 3000) {
                this.isShowWB = true;
            }
        }
    }
    loadUserData(user_data) {
        this.user_data = user_data;
        this.balance = user_data.balance;
        this.businesses.forEach(business => { business.loadSaveProgress(user_data.businesses[business.b_idx]) });
        this.shop.managers.forEach(manager => { manager.isPurchase = user_data.shop.managers[manager.m_idx] });
    }
    saveUserData() {
        if (!this.user_data) return;
        var businesses = [];
        this.businesses.forEach(business => { businesses.push(business.getLatestProgress()) });
        var managers = [];
        this.shop.managers.forEach(manager => { managers.push(manager.isPurchase) });
        var user_data = {
            user_id: this.user_data.user_id,
            balance: this.balance,
            last_timestamp: new Date().getTime(),
            businesses: businesses,
            shop: {
                managers: managers
            }
        }
        localStorage.setItem("user_data", JSON.stringify(user_data));
    }
    calcualteOfflineRevenue () {
        var elapsed_time = new Date().getTime() - this.user_data.last_timestamp;
        this.offline_revenue = 0;
        this.businesses.forEach(business => { 
            let remain_process_time = this.user_data.businesses[business.b_idx].remain_process_time;
            if (business.isManager) {
                this.offline_revenue += business.calculateRevenueByTime(elapsed_time, remain_process_time);
            } else if (business.isRunning){
                this.offline_revenue += business.calculateLastProgress(elapsed_time, remain_process_time);
            }
        });
        this.updateBalance(this.offline_revenue)
    }
    restart() {
        localStorage.removeItem("user_data");
        location.reload();
    }
}