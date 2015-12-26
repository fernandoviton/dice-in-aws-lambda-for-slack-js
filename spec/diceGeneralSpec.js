var Dice = require('../lib/diceGeneral');

describe("Dice suite", function() {
  it("rollPercentiles returns digits each 0-9", function() {
    expect(Dice.rollPercentiles({d10: function() {return 1;}})).toEqual([0,0]);
    expect(Dice.rollPercentiles({d10: function() {return 10;}})).toEqual([90,9]);
    expect(Dice.rollPercentiles({d10: function() {return 5;}})).toEqual([40,4]);
  });

  it("getting total of rollPercentiles", function() {
    expect(Dice.totalOfPercentilesRoll([50, 6])).toEqual(56);
    expect(Dice.totalOfPercentilesRoll([90, 9])).toEqual(99);
    expect(Dice.totalOfPercentilesRoll([0, 0])).toEqual(100);
    expect(Dice.totalOfPercentilesRoll(Dice.rollPercentiles({d10: function() {return 2;}}))).toEqual(11);
  });

  it("getting total of rolls", function() {
    expect(function () {Dice.totalOfRoll([])}).toThrow("Empty Input");
    expect(Dice.totalOfRoll([6])).toEqual(6);
    expect(Dice.totalOfRoll([6, 7])).toEqual(13);
  });

  it("rollDice called with invalid input", function() {
    expect(function () {Dice.rollDice(null)}).toThrow("No Input Options");
    expect(function () {Dice.rollDice(null, {blah: 5})}).toThrow("No Input Sides");
  });

  it("rollDice of (implicitly) single die", function() {
    var chanceInteger = function(options, expectedMax, retVal)
    {
      if (options.min != 1) throw "min always expected as 1";
      if (options.max != expectedMax) throw "max not as expected";
      if (retVal > options.max) throw "retVal greater than max";
      return retVal;
    };
    var chanceIntegerFor10 = function(options, retVal) {return chanceInteger(options, 10, retVal);};
    var chanceIntegerFor3 = function(options, retVal) {return chanceInteger(options, 3, retVal);};
    expect(Dice.rollDice({integer: function(options) {return chanceIntegerFor10(options, 1);}}, {sides:10})).toEqual([1]);
    expect(Dice.rollDice({integer: function(options) {return chanceIntegerFor10(options, 5);}}, {sides:10})).toEqual([5]);
    expect(Dice.rollDice({integer: function(options) {return chanceIntegerFor3(options, 1);}}, {sides:3})).toEqual([1]);
    expect(Dice.rollDice({integer: function(options) {return chanceIntegerFor3(options, 3);}}, {sides:3})).toEqual([3]);
  });

  it("rollDice of multiple dice and explicit single die", function() {
    expect(Dice.rollDice({integer: function(options) {return 3;}}, {sides:6, numOfDice:1})).toEqual([3]);
    expect(Dice.rollDice({integer: function(options) {return 4;}}, {sides:6, numOfDice:3})).toEqual([4,4,4]);
    expect(Dice.rollDice({integer: function(options) {return 5;}}, {sides:8, numOfDice:4})).toEqual([5,5,5,5]);
  });
});
