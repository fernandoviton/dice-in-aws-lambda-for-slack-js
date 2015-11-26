exports.rollDice = function () {
  return 10;
}

exports.rollDice2 = function (chance) {
  return chance.d20();
}

exports.rollPercentiles = function(chance) {
  return [chance.d10()-1, chance.d10()-1];
}
