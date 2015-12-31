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
  if (options.sides >= 1)
  {
    while (options.numOfDice-- > 0)
      retArray.push(chance.integer({min: 1, max:options.sides}));
  }
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
exports.totalOfRoll = function(diceRolled, toAdd)
{
  if (diceRolled.length == 0) throw "Empty Input";
  if (toAdd == undefined)
    toAdd = 0;
  return diceRolled.reduce(function(a, b) { return a + b; }) + toAdd;
}

exports.getRollDataFromParsedRoll = function(parsedRollData)
{
  if (parsedRollData.length < 3) return null;
  var toAdd = parsedRollData.length == 3 ? 0 : parsedRollData[3];
  return {sides: parsedRollData[2], numOfDice: parsedRollData[1], add: toAdd};
}
