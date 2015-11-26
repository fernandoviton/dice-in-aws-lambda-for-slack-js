var Dice = require('../lib/diceGeneral');

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(Dice.rollDice()).toBe(10);
  });

  it ("rollDice returns blah", function() {
    expect(Dice.rollDice2({d20: function() {return 5;}})).toBe(5);
  });

  it("rollPercentiles returns digits each 0-9", function() {
    expect(Dice.rollPercentiles({d10: function() {return 1;}})).toEqual([0,0]);
    expect(Dice.rollPercentiles({d10: function() {return 10;}})).toEqual([9,9]);
    expect(Dice.rollPercentiles({d10: function() {return 5;}})).toEqual([4,4]);
  });
});
