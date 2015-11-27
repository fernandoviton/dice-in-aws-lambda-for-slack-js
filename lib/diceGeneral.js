// return an array consisting of 2 results each representing a die used in a percentile calculation
exports.rollPercentiles = function(chance) {
  return [chance.d10()-1, chance.d10()-1];
}

// given a result of a rollPercentiles call, translate it to the actual percentile value
exports.totalOfPercentilesRoll = function(roll)
{
    var total = roll[0] + roll[1];
    if (total === 0)
        return 100;
    return total;
}

// given an array of dice rolled, return the sum of the rolls
exports.totalOfRoll = function(diceRolled)
{
    return diceRolled.reduce(function(a, b) { return a + b; });
}
