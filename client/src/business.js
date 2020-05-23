import { convertNumber, calculateRemainTime } from './calculation.js';
import { business_name } from './config.js';
export default class Business { 
    constructor(game, b_idx){
        this.game = game; 
        this.b_idx = b_idx;
        this.business_name = b_idx < business_name.length ? business_name[b_idx] : '';
        this.isPurchase = b_idx == 0 ? true : false;
        this.isRunning = false;
        this.isManager = false;

        this.purchase_price = 5 * Math.pow(12, b_idx);

        this.base_price_multiplier = b_idx == 0 ? 1.07 : (1.16-(b_idx*0.01)); //*
        this.base_price = 4 * Math.pow(15, b_idx); //*
        this.base_revenue = b_idx == 0 ? 1 : this.purchase_price / 2; //*
        this.base_time = 1500 * Math.pow(2, b_idx); //ms


        this.tier = 1;
        this.upgrade_cnt = 1;
        this.max_upgrade = 25;
        this.revenue_modifier = 1;

        this.price = b_idx == 0 ? this.base_price : this.base_price * this.base_price_multiplier;
        this.revenue = this.base_revenue * this.upgrade_cnt * this.revenue_modifier;
        this.process_time = this.tier > 1 ? this.base_time * Math.pow(0.5, this.tier) : this.base_time;
        this.remain_time = '00:00:00';
        this.start_time = 0;
        this.progress_percent = 0;
        this.ableToUpgrade = false;
        this.ableToPurchase = false;

        this.img_icon = new Image();
        this.img_icon.src = '../client/assets/images/business_' + this.b_idx + '.png';
        this.btn_upgrade = new Image();
        this.btn_upgrade.src = '../client/assets/images/btn_upgrade.png';
        this.btn_upgrade_disable = new Image();
        this.btn_upgrade_disable.src = '../client/assets/images/btn_upgrade_disable.png';
        this.btn_purchase = new Image();
        this.btn_purchase.src = '../client/assets/images/btn_purchase.png';
        this.btn_purchase_disable = new Image();
        this.btn_purchase_disable.src = '../client/assets/images/btn_purchase_disable.png';
        this.progress_bar = new Image();
        this.progress_bar.src = '../client/assets/images/progress_bar.png';
        this.progress = new Image();
        this.progress.src = '../client/assets/images/progress.png';
        this.img_time = new Image();
        this.img_time.src = '../client/assets/images/img_time.png';
        
        this.business_size_x = 300;
        this.business_size_y = 80;

        this.icon_width = 60;
        this.icon_height = 60;
        this.revenue_width = 220;
        this.revenue_height = 30;
        this.upgrade_width = 190;
        this.upgrade_height = 40;
        this.time_width = 60;
        this.time_height = 40;
        this.purchase_width = 300;
        this.purchase_height = 70;

        this.offset_x = this.b_idx < 5 ? 70 : 110 + this.business_size_x;
        this.offset_y = this.b_idx < 5 ? 60 : 60 - this.business_size_y * 5;
        
        this.icon_x = this.offset_x + 15;
        this.icon_y = this.offset_y + (this.b_idx * this.business_size_y) + 45;
        this.revenue_x = this.offset_x + 80;
        this.revenue_y = this.offset_y + (this.b_idx * this.business_size_y) + 45;
        this.upgrade_x = this.offset_x + 80;
        this.upgrade_y = this.offset_y + (this.b_idx * this.business_size_y) + 75
        this.time_x = this.offset_x + 240;
        this.time_y = this.offset_y + (this.b_idx * this.business_size_y) + 75;
        this.purchase_x = this.offset_x + 10;
        this.purchase_y = this.offset_y + (this.b_idx * this.business_size_y) + 45;

        this.font_upgrade_count = "10px Arial";
        this.font_revenue = "18px Arial";
        this.font_upgrade = "14px Arial";
        this.font_time = "10px Arial";
        this.font_purchase = "14px Arial";
    }
    update(timeStamp) {
        if (this.isPurchase && (this.isRunning || this.isManager)) {
            if (timeStamp > this.start_time + this.process_time) {
                this.game.updateBalance(this.revenue);
                if (this.isManager) {
                    this.isRunning = true;
                    this.start_time = timeStamp;
                } else {
                    this.isRunning = false;
                }
            } else {
                this.remain_time = calculateRemainTime(this.start_time + this.process_time - timeStamp);
                this.progress_percent = (1 - ((this.start_time + this.process_time - timeStamp) / this.process_time )) ;
                
            }
        } else {
            this.progress_percent = 0;
        }
        this.ableToUpgrade = this.game.balance >= this.price ? true : false;
        this.ableToPurchase = this.game.balance >= this.purchase_price ? true : false;

    }
    draw(ctx) {
        if(this.isPurchase) {
            ctx.textAlign = "center"; 
            //icon
            ctx.drawImage(this.img_icon, this.icon_x, this.icon_y, this.icon_width, this.icon_height );
            ctx.font = this.font_upgrade_count;
            ctx.fillText(this.upgrade_cnt + '/' + this.max_upgrade, this.icon_x + 30, this.icon_y + 70);
            //progress bar + revenue
            ctx.drawImage(this.progress_bar, this.revenue_x, this.revenue_y, this.revenue_width, this.revenue_height );
            ctx.drawImage(this.progress, 0, 0, this.progress_percent * this.revenue_width, 30, this.revenue_x, this.revenue_y, this.progress_percent * this.revenue_width, this.revenue_height );
            ctx.font = this.font_revenue;
            ctx.fillText(convertNumber(this.revenue), this.revenue_x + 100, this.revenue_y + 22);
            //upgrade btn
            ctx.drawImage(this.ableToUpgrade ? this.btn_upgrade : this.btn_upgrade_disable, this.upgrade_x, this.upgrade_y, this.upgrade_width, this.upgrade_height );
            ctx.font = this.font_upgrade;
            ctx.fillText(convertNumber(this.price), this.upgrade_x + 100, this.upgrade_y + 20);
            //process time
            ctx.drawImage(this.img_time, this.time_x, this.time_y, this.time_width, this.time_height );
            ctx.font = this.font_time;
            ctx.fillText(this.remain_time, this.time_x + 35, this.time_y + 20);
        }
        else {
            //purchase btn
            ctx.drawImage(this.ableToPurchase ? this.btn_purchase : this.btn_purchase_disable, this.purchase_x, this.purchase_y, this.purchase_width, this.purchase_height );
            ctx.font = this.font_purchase;
            ctx.fillText('Buy: ' + this.business_name + ' ' + convertNumber(this.purchase_price), this.purchase_x + 140, this.purchase_y + 40);   
        }
    }
    onClick(x, y) {
        if (this.isPurchase && y > this.icon_y && y < this.icon_y + this.icon_height 
            && x > this.icon_x && x < this.icon_x + this.icon_width) {
            if (!this.isRunning && !this.isManager) {
                this.isRunning = true;
                this.start_time = this.game.current_timestamp;
            }
        } else if (this.isPurchase && y > this.upgrade_y && y < this.upgrade_y + this.upgrade_height 
            && x > this.upgrade_x && x < this.upgrade_x + this.upgrade_width) {
                this.onClickUpgrade();
        } else if (!this.isPurchase && y > this.purchase_y && y < this.purchase_y + this.purchase_height 
            && x > this.purchase_x && x < this.purchase_x + this.purchase_width) {
                this.onClickPurchase();
        }
    }
    onClickPurchase() {
        if (this.game.balance >= this.purchase_price) {
            if (this.game.s_purchase.duration > 0) { this.game.s_purchase.load(); }
            this.game.s_purchase.play();
            this.game.updateBalance(-this.purchase_price);
            this.isPurchase = true;
            if (this.isManager) {
                this.start_time = this.game.current_timestamp;
            }
        }
    }
    onClickUpgrade() {
        if (this.game.balance >= this.price) {
            if (this.game.s_click.duration > 0) { this.game.s_click.load(); }
            this.game.s_click.play();
            this.game.updateBalance(-this.price);
            this.upgrade_cnt++;
            if (this.upgrade_cnt >= this.max_upgrade) {
                if (this.game.s_upgrade_tier.duration > 0) { this.game.s_upgrade_tier.load(); }
                this.game.s_upgrade_tier.play();
                this.max_upgrade *= 2;
                this.tier++;
                if (this.tier % 2 == 0) {
                    this.process_time = this.base_time / 2;
                } else {
                    this.revenue_modifier *= 2
                }
            }
            this.price = this.price * this.base_price_multiplier;
            this.revenue = this.base_revenue * this.upgrade_cnt * this.revenue_modifier;
        }
    }
    activateManager() {
        this.isManager = true;
        if (!this.isRunning && this.isPurchase) {
            this.start_time = this.game.current_timestamp;
        } 
    }
    calculateRevenueByTime(elapsed_time) {
        let remain_elapsed_time = elapsed_time - this.remain_process_time;
        let round_cnt = remain_elapsed_time > 0 ? Math.floor(remain_elapsed_time / this.process_time) : 0;
        let remain_time = remain_elapsed_time % this.process_time;
        this.start_time = Math.abs(remain_time) - this.process_time + this.game.current_timestamp;
        return round_cnt * this.revenue;
    }
    calculateLastProgress(elapsed_time){
        let delta_time = elapsed_time - this.remain_process_time;
        if (delta_time > 0) {
            this.isRunning = false;
            return this.revenue;
        } else {
            this.start_time = Math.abs(delta_time) - this.process_time + this.game.current_timestamp;
            return 0;
        }
    }
    getLatestProgress () {
        return {
            b_idx: this.b_idx,
            isRunning : this.isRunning,
            isPurchase : this.isPurchase,
            isManager : this.isManager,
            tier : this.tier,
            upgrade_cnt : this.upgrade_cnt,
            max_upgrade : this.max_upgrade,
            revenue_modifier : this.revenue_modifier,
            price: this.price,
            revenue: this.revenue,
            ableToUpgrade : this.ableToUpgrade,
            ableToPurchase : this.ableToPurchase,
            remain_process_time: this.start_time + this.process_time - this.game.current_timestamp,
            process_time: this.process_time,
        }
    }
    loadSaveProgress (data) {
        this.isRunning = data.isRunning;
        this.isPurchase = data.isPurchase;
        this.isManager = data.isManager;
        this.tier = data.tier;
        this.upgrade_cnt = data.upgrade_cnt;
        this.max_upgrade = data.max_upgrade;
        this.revenue_modifier = data.revenue_modifier;
        this.revenue = data.revenue;
        this.price = data.price;
        this.ableToUpgrade = data.ableToUpgrade;
        this.ableToPurchase = data.ableToPurchase;
        this.remain_process_time = data.remain_process_time
        this.process_time = data.process_time;
    }
}