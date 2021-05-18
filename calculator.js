function calculateMedian(high, low) {
    return (high + low) / 2;
}

function calculateHighVar(high, last) {
    return ((high * 100 / last) - 100).toFixed(2);
}

function calculateLowVar(low, last) {
    return ((low * 100 / last) - 100).toFixed(2);
}

module.exports.calculateMedian = calculateMedian;
module.exports.calculateHighVar = calculateHighVar;
module.exports.calculateLowVar = calculateLowVar;