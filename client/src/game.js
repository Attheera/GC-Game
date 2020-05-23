import Business from './business.js';
import Shop from './shop.js';
import UI from './ui.js';
import { convertNumber, calculateRemainTime } from './calculation.js';
import { max_business } from './config.js';

export default class Game { 
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.balance = 0;
        this.current_timestamp = 0;
        
        this.max_business = max_business;
        this.businesses = [];
        for (let i = 0 ; i < this.max_business ; i++) {
            this.businesses.push ( new Business(this, i));
        }
        this.shop = new Shop(this);
        this.ui = new UI(this);

        this.bg_game = new Image();
        this.bg_game.src = '../client/assets/images/bg_game.png';

        this.s_bgm = new Audio('../client/assets/sounds/bgm.mp3');
        this.s_effect = new Audio();
        this.s_click = '../client/assets/sounds/click.wav';
        this.s_purchase = '../client/assets/sounds/purchase.wav';
        this.s_upgrade = '../client/assets/sounds/upgrade.wav';

        this.s_bgm.loop = true;
    }
    input({ x, y }) {
        this.s_bgm.play();
        if (this.isShowWB) { 
            this.s_effect = new Audio(this.s_click);
            this.s_effect.play();
            this.isShowWB = false;
            return;
        }
        this.ui.onClick(x, y);
        this.shop.onClick(x, y);
        this.businesses.forEach(business => business.onClick(x, y));
    }
    update(timestamp) {
        this.current_timestamp = timestamp;
        this.businesses.forEach(business => business.update(timestamp));
        this.shop.update(timestamp);
        this.saveUserData();
    }
    draw(ctx) {
        ctx.drawImage(this.bg_game, 0, 0, this.gameWidth, this.gameHeight);
        this.businesses.forEach(business => business.draw(ctx));
        this.shop.draw(ctx);
        this.ui.draw(ctx);
        this.drawWB(ctx);
    }
    drawWB (ctx) {
        if (!this.isShowWB) { return; }
        ctx.textAlign = "center";
        ctx.drawImage(this.bg_game, 0, 0, this.gameWidth, this.gameHeight);
        ctx.font = '50px Arial';
        ctx.fillText("Welcome Back!", 400,150);
        ctx.font = '30px Arial';
        ctx.fillText("You were away for " + calculateRemainTime(this.away_time), 400,300);
        ctx.font = '40px Arial';
        ctx.fillText("Receive: " + convertNumber(this.offline_revenue), 400, 350);
    }
    updateBalance(amount) {
        this.balance = this.balance + amount;
    }
    ///////////////////////////////////////////////////////////////////////////////////////
    checkUser () {
        let user_data = localStorage.getItem('user_data');
        if (!user_data) {
            this.createNewUser();
        } else {
            this.loadUserData(JSON.parse(user_data));
            this.checkOfflineTime();
            this.calcualteOfflineRevenue();
        }
    }
    createNewUser (){
        let user_data = {
            user_id: new Date().getTime(),
            balance: 0,
        }
        localStorage.setItem("user_data", JSON.stringify(user_data));
        this.user_data = user_data;
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
    checkOfflineTime() {
        this.away_time = new Date().getTime() - this.user_data.last_timestamp;
        if (this.away_time > 3000) {
            this.isShowWB = true;
        }
    }
    calcualteOfflineRevenue () {
        var elapsed_time = new Date().getTime() - this.user_data.last_timestamp;
        this.offline_revenue = 0;
        this.businesses.forEach(business => { 
            if (business.isManager) {
                this.offline_revenue += business.calculateRevenueByTime(elapsed_time);
            } else if (business.isRunning){
                this.offline_revenue += business.calculateLastProgress(elapsed_time);
            }
        });
        this.updateBalance(this.offline_revenue)
    }
    restart() {
        localStorage.removeItem("user_data");
        location.reload();
    }
}