export default class Business { 
    constructor(game, b_idx){
        this.game = game; 
        this.b_idx = b_idx;

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

        this.current_upgrade_cnt = 1;
        this.current_max_upgrade = 1;

        this.price = this.base_price * this.upgrade_cnt;
        this.revenue = this.base_revenue * this.upgrade_cnt * this.revenue_modifier;
        this.process_time = this.base_time;
        this.remain_time = '00:00:00';
        this.start_time = 0;



        this.img_icon = new Image();
        this.img_icon.src = '../client/assets/images/business_' + this.b_idx + '.png';
        this.btn_upgrade = new Image();
        // this.btn_upgrade.src = '../assets/images/btn_upgrade.png';
        this.btn_purchase = new Image();
        this.process_bar = new Image();
        
        this.business_size_x = 300;
        this.business_size_y = 70;

        this.icon_width = 50;
        this.icon_height = 50;
        this.revenue_width = 250;
        this.revenue_height = 30;
        this.upgrade_width = 190;
        this.upgrade_height = 40;
        this.time_width = 60;
        this.time_height = 40;
        this.purchase_width = 300;
        this.purchase_height = 70;

        this.offset_x = this.b_idx < 5 ? 70 : 130 + this.business_size_x;
        this.offset_y = this.b_idx < 5 ? 80 : 80 - this.business_size_y * 5;
        
        this.icon_x = this.offset_x - 50;
        this.icon_y = this.offset_y + (this.b_idx * this.business_size_y) + 35;
        this.revenue_x = this.offset_x;
        this.revenue_y = this.offset_y + (this.b_idx * this.business_size_y) + 55;
        this.upgrade_x = this.offset_x;
        this.upgrade_y = this.offset_y + (this.b_idx * this.business_size_y) + 75
        this.time_x = this.offset_x + 200;
        this.time_y = this.offset_y + (this.b_idx * this.business_size_y) + 75;
        this.purchase_x = this.offset_x;
        this.purchase_y = this.offset_y + (this.b_idx * this.business_size_y) + 55;
    }
    update(timeStamp) {
        if (this.isRunning || this.isManager) {
            if (timeStamp > this.start_time + this.process_time) {
                this.game.updateBalance(this.revenue);
                if (this.isManager) {
                    this.isRunning = true;
                    this.start_time = timeStamp;
                } else {
                    this.isRunning = false;
                }
            } else {
                this.calculateRemainTime(this.start_time + this.process_time - timeStamp);
            }
        }
    }
    draw(ctx) {
        if(this.isPurchase) {
            //icon
            ctx.drawImage(this.img_icon, this.icon_x, this.icon_y, this.icon_width, this.icon_height );
            ctx.font = "10px Arial";
            ctx.fillText(this.upgrade_cnt + '/' + this.max_upgrade, this.icon_x + 15, this.icon_y + 50);
            //progress bar + revenue
            ctx.font = "22px Arial";
            ctx.fillText('Revenue: ' + this.revenue.toFixed(2), this.revenue_x, this.revenue_y);
            //upgrade btn
            ctx.font = "14px Arial";
            ctx.fillText('Upgrade: ' + this.price.toFixed(2), this.upgrade_x, this.upgrade_y);
            //process time
            ctx.font = "18px Arial";
            ctx.fillText(this.remain_time, this.time_x, this.time_y);
        }
        else {
            //purchase btn
            ctx.font = "14px Arial";
            ctx.fillText('Purchase: ' + this.purchase_price.toFixed(2), this.purchase_x, this.purchase_y);   
        }
    }
    onClick(x, y) {
        if (y > this.icon_y && y < this.icon_y + this.icon_height 
            && x > this.icon_x && x < this.icon_x + this.icon_width) {
            if (!this.isRunning && !this.isManager) {
                this.isRunning = true;
                this.start_time = this.game.current_timestamp;
            }
        } else if (y > this.upgrade_y && y < this.upgrade_y + this.upgrade_height 
            && x > this.upgrade_x && x < this.upgrade_x + this.upgrade_width) {
                this.onClickUpgrade();
        } else if (y > this.purchase_y && y < this.purchase_y + this.purchase_height 
            && x > this.purchase_x && x < this.purchase_x + this.purchase_width) {
                this.onClickPurchase();
        }
    }
    onClickPurchase() {
        if (this.game.balance > this.purchase_price) {
            this.game.updateBalance(-this.purchase_price);
            this.isPurchase = true;
        }
    }
    onClickUpgrade() {
        if (this.game.balance >= this.price) {
            this.game.updateBalance(-this.price);
            this.upgrade_cnt++;

            if (this.upgrade_cnt >= this.max_upgrade) {
                this.max_upgrade *= 2;
                this.process_time = this.base_time * Math.pow(0.5, this.tier);
            }
            this.price = this.price * this.base_price_multiplier;
            this.revenue = this.base_revenue * this.upgrade_cnt * this.revenue_modifier;
        }
    }
    calculateMaxUpgrade(count = 0, price = 0) {
        if (this.game.balance >=
            price + (this.price * Math.pow(this.base_price_multiplier, count))
            ){
            let new_price = price + (this.price * Math.pow(this.base_price_multiplier, count))
            count ++;
            return this.calculateMaxUpgrade(count, new_price);
        } else {
            return { count: count, price: price };
        }
    }
    getUpgradePriceByMultiplier (multiplier) {
        return this.base_price * this.upgrade_cnt;
    }

    calculateRemainTime(duration) {
        let h = Math.floor((duration / (1000 * 60 * 60)) % 24);
        let m = Math.floor((duration / (1000 * 60)) % 60);
        let s = Math.floor((duration / 1000) % 60);

        this.remain_time = (h < 10 ? "0" + h : h) + ':' + 
                           (m < 10 ? "0" + m : m) + ':' + 
                           (s < 10 ? "0" + s : s);
    }
    
}