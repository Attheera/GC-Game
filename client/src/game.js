import Business from './business.js';
export default class Game { 
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.max_business = 10;
        this.current_timestamp = 0;
        this.businesses = [];
        this.balance = 0;
        
        for (let i = 0 ; i < this.max_business ; i++) {
            this.businesses.push ( new Business(this, i));
        }
    }
    input(event) {
        this.businesses.forEach(function(business) {
            business.onClick(event.pageX, event.pageY);
        });
    }
    update(timeStamp) {
        this.current_timestamp = timeStamp;
        this.businesses.forEach(business => business.update(timeStamp));
    }
    draw(ctx) {
        ctx.font = "30px Arial";
        ctx.fillText('Balance: ' + this.balance.toFixed(2), 10, 50);
        this.businesses.forEach(business => business.draw(ctx));
    }
    updateBalance(amount) {
        this.balance += amount;
    }
}