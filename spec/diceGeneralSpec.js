var Dice = require('../lib/diceGeneral');

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(Dice.rollDice()).toBe(10);
  });

  it ("rollDice returns blah", function() {
    expect(Dice.rollDice2({d20: function() {return 5;}})).toBe(5);
  });
});
