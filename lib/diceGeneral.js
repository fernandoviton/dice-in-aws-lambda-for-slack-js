// return an array consisting of 2 results each representing a die used in a percentile calculation
exports.rollPercentiles = function(chance) {
  return [(chance.d10()-1)*10, chance.d10()-1];
}

// returns an array of length options.numOfDice with each being the result of a roll of a die with options.sides
// options should contain {sides, (optionally, defaults to 1) numOfDice}
exports.rollDice = function(chance, options) {
  if (options == null) throw "No Input Options";
  if (options.sides == undefined) throw  "No Input Sides";
  if (options.numOfDice == undefined) options.numOfDice = 1;
  var retArray = [];
  while (options.numOfDice-- > 0)
    retArray.push(chance.integer({min: 1, max:options.sides}));
  return retArray;
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
  if (diceRolled.length == 0) throw "Empty Input";
  return diceRolled.reduce(function(a, b) { return a + b; });
}
