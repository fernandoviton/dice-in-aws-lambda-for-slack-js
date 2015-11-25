var Dice = require('../lib/diceGeneral');

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(Dice.rollDice()).toBe(10);
  });
});
