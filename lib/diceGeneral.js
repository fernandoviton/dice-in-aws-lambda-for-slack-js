exports.rollDice = function () {
  return 10;
}

exports.rollDice2 = function (chance) {
  return chance.d20();
}

// return an array consisting of 2 results each representing a die used in a percentile calculation
exports.rollPercentiles = function(chance) {
  return [chance.d10()-1, chance.d10()-1];
}
