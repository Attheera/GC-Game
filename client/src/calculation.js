export function convertNumber(number) {
    var abbr = '';
    if (number / Math.pow(10, 15) >= 1) {
        number = (number / Math.pow(10, 15));
        abbr = 'quad';
    } else if (number / Math.pow(10, 12) >= 1) {
        number = (number / Math.pow(10, 12));
        abbr = 'tril';
    } else if (number / Math.pow(10, 9) >= 1) {
        number = (number / Math.pow(10, 9));
        abbr = 'bil';
    } else if (number / Math.pow(10, 6) >= 1) {
        number = (number / Math.pow(10, 6));
        abbr = 'mil';
    }
    number = number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return number + abbr;
}
export function calculateRemainTime(duration) {
    let h = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let m = Math.floor((duration / (1000 * 60)) % 60);
    let s = Math.floor((duration / 1000) % 60);

    return (h < 10 ? "0" + h : h) + ':' + 
           (m < 10 ? "0" + m : m) + ':' + 
           (s < 10 ? "0" + s : s);
}