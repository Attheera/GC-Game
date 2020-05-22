export function convertNumber(x) {
    var y = '';
    if (x / Math.pow(10, 15) >= 1) {
        x = (x / Math.pow(10, 15));
        y = 'quad';
    } else if (x / Math.pow(10, 12) >= 1) {
        x = (x / Math.pow(10, 12));
        y = 'tril';
    } else if (x / Math.pow(10, 9) >= 1) {
        x = (x / Math.pow(10, 9));
        y = 'bil';
    } else if (x / Math.pow(10, 6) >= 1) {
        x = (x / Math.pow(10, 6));
        y = 'mil';
    }
    x = x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return x + y;
}