const calculateTip = (total, tipPercent = .1) => {
    const tip = total * tipPercent;
    return total + tip;
};

module.exports = {
    calculateTip
}