exports.getFiboSeries = function (n) {
    let result = '';
    let a = 0;
    let b = 1;

    result += a + ' ' + b + ' ';
    let i = 3;
    while (i <= n) {
        let c = a + b;
        result += c + ' ';

        a = b;
        b = c;

        i++;
    }
    return result.trim();
}