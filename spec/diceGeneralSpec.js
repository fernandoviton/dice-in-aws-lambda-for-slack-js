var Dice = require('../lib/diceGeneral');

describe("rollPercentiles", function() {
  it("returns digits each 0-9", function() {
    expect(Dice.rollPercentiles({d10: function() {return 1;}})).toEqual([0,0]);
    expect(Dice.rollPercentiles({d10: function() {return 10;}})).toEqual([90,9]);
    expect(Dice.rollPercentiles({d10: function() {return 5;}})).toEqual([40,4]);
  });

  it("getting total", function() {
    expect(Dice.totalOfPercentilesRoll([50, 6])).toEqual(56);
    expect(Dice.totalOfPercentilesRoll([90, 9])).toEqual(99);
    expect(Dice.totalOfPercentilesRoll([0, 0])).toEqual(100);
    expect(Dice.totalOfPercentilesRoll(Dice.rollPercentiles({d10: function() {return 2;}}))).toEqual(11);
  });
});

describe("rollDice", function() {
  it("getting total", function() {
    expect(function () {Dice.totalOfRoll([])}).toThrow("Empty Input");
    expect(Dice.totalOfRoll([6])).toEqual(6);
    expect(Dice.totalOfRoll([6, 7])).toEqual(13);
  });

  it("getting total with addition", function() {
    expect(Dice.totalOfRoll([6], 10)).toEqual(16);
    expect(Dice.totalOfRoll([6], -10)).toEqual(-4);
  });

  it("called with invalid input", function() {
    expect(function () {Dice.rollDice(null)}).toThrow("No Input Options");
    expect(function () {Dice.rollDice(null, {blah: 5})}).toThrow("No Input Sides");
  });

  it("of (implicitly) single die", function() {
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

  it("of multiple dice and explicit single die", function() {
    expect(Dice.rollDice({integer: function(options) {return 3;}}, {sides:6, numOfDice:1})).toEqual([3]);
    expect(Dice.rollDice({integer: function(options) {return 4;}}, {sides:6, numOfDice:3})).toEqual([4,4,4]);
    expect(Dice.rollDice({integer: function(options) {return 5;}}, {sides:8, numOfDice:4})).toEqual([5,5,5,5]);
  });

  it("of zero sides and/or numOfDice", function() {
    expect(Dice.rollDice({integer: function(options) {return 3;}}, {sides:0, numOfDice:1})).toEqual([]);
    expect(Dice.rollDice({integer: function(options) {return 3;}}, {sides:0, numOfDice:0})).toEqual([]);
    expect(Dice.rollDice({integer: function(options) {return 3;}}, {sides:1, numOfDice:0})).toEqual([]);
  });
});

describe("getRollDataFromParsedRoll", function() {
  it("of incomplete (invalid) rollData returns null", function() {
    expect(Dice.getRollDataFromParsedRoll([])).toBe(null);
    expect(Dice.getRollDataFromParsedRoll(["blah"])).toBe(null);
    expect(Dice.getRollDataFromParsedRoll(["blah", 1])).toBe(null);
  });
  it("of incomplete (valid) values translates into appropriate structure", function() {
    expect(Dice.getRollDataFromParsedRoll(["anything", 1, 2])).toEqual({numOfDice:1, sides:2, add:0});
  });
  it("of complete values translates into appropriate structure", function() {
    expect(Dice.getRollDataFromParsedRoll(["anything", 1, 2, 3])).toEqual({numOfDice:1, sides:2, add:3});
    expect(Dice.getRollDataFromParsedRoll(["anything", 0, 1, 5])).toEqual({numOfDice:0, sides:1, add:5});
  });
});
