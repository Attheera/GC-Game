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
export function calculateRemainTime(duration) {
    let h = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let m = Math.floor((duration / (1000 * 60)) % 60);
    let s = Math.floor((duration / 1000) % 60);

    return (h < 10 ? "0" + h : h) + ':' + 
                       (m < 10 ? "0" + m : m) + ':' + 
                       (s < 10 ? "0" + s : s);
}