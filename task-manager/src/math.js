const calculateTip = (total, tipPercent = .1) => {
    const tip = total * tipPercent;
    return total + tip;
};

const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return rej('numbers must be positive');
            }
            res(a + b);
        }, 2000);
    });
};

module.exports = {
    calculateTip,
    add
}