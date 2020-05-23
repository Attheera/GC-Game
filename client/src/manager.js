import { business_name } from './config.js';
import { convertNumber } from './calculation.js';
export default class Manager { 
    constructor(game, m_idx){
        this.game = game;
        this.m_idx = m_idx;
        this.price = m_idx == 0 ? 1000 : 1000 * m_idx * Math.pow(5, m_idx);
        this.manager_name = business_name[m_idx];

        this.ableToPurchase = false;
        this.isPurchase = false;

        this.manager_size_x = 300;
        this.manager_size_y = 80;
        this.icon_width = 60;
        this.icon_height = 60;
        this.purchase_width = 300;
        this.purchase_height = 70;

        this.offset_x = this.m_idx < 5 ? 70 : 110 + this.manager_size_x;
        this.offset_y = this.m_idx < 5 ? 60 : 60 - this.manager_size_y * 5;
        
        this.purchase_x = this.offset_x + 10;
        this.purchase_y = this.offset_y + (this.m_idx * this.manager_size_y) + 45;
        this.icon_x = this.purchase_x + 5;
        this.icon_y = this.purchase_y + 5;

        this.font_purchase = "14px Arial";

        this.icon = new Image();
        this.icon.src = '../client/assets/images/business_' + this.m_idx + '.png';
        this.btn_purchase = new Image();
        this.btn_purchase.src = '../client/assets/images/btn_purchase.png';
        this.btn_purchase_disable = new Image();
        this.btn_purchase_disable.src = '../client/assets/images/btn_purchase_disable.png';
        
    }
    update(timestamp) {
        this.ableToPurchase = this.game.balance >= this.price ? true : false;
    }
    draw(ctx) {
        ctx.font = this.font_purchase;
        if (!this.isPurchase) {
            ctx.drawImage(this.ableToPurchase ? this.btn_purchase : this.btn_purchase_disable, this.purchase_x, this.purchase_y, this.purchase_width, this.purchase_height );
            ctx.globalAlpha = this.ableToPurchase ? 1 : 0.5;
            ctx.drawImage(this.icon, this.icon_x, this.icon_y, this.icon_width, this.icon_height );
            ctx.globalAlpha = 1;
            ctx.fillText('Hire : ' + this.manager_name + ' Manager', this.purchase_x + 170, this.purchase_y + 30);   
            ctx.fillText('For ' + convertNumber(this.price), this.purchase_x + 170, this.purchase_y + 50);   
        } else {
            ctx.drawImage(this.icon, this.icon_x, this.icon_y, this.icon_width, this.icon_height );
            ctx.fillText(this.manager_name + ' is running..', this.purchase_x + 170, this.purchase_y + 40);   
        }
    }
    onClick(x, y) {
        if (!this.isPurchase && this.ableToPurchase && y > this.purchase_y && y < this.purchase_y + this.purchase_height 
            && x > this.purchase_x && x < this.purchase_x + this.purchase_width) {
                this.onClickPurchase();
        }
    }
    onClickPurchase() {
        this.game.updateBalance(-this.price);
        this.isPurchase = true;
        this.game.businesses[this.m_idx].activateManager();
    }
}