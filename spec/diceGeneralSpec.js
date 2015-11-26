var Dice = require('../lib/diceGeneral');

describe("A suite", function() {
  it("rollPercentiles returns digits each 0-9", function() {
    expect(Dice.rollPercentiles({d10: function() {return 1;}})).toEqual([0,0]);
    expect(Dice.rollPercentiles({d10: function() {return 10;}})).toEqual([9,9]);
    expect(Dice.rollPercentiles({d10: function() {return 5;}})).toEqual([4,4]);
  });

  it("getting total of rollPercentiles", function() {
    expect(Dice.totalOfPercentilesRoll([50, 6])).toEqual(56);
    expect(Dice.totalOfPercentilesRoll([90, 9])).toEqual(99);
    expect(Dice.totalOfPercentilesRoll([0, 0])).toEqual(100);
  });

  if("getting total of rolls", function() {
    expect(Dice.totalOfRoll([])).toEqual(0);
    expect(Dice.totalOfRoll([6])).toEqual(6);
    expect(Dice.totalOfRoll([6, 7])).toEqual(13);
  });
});
