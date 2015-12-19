var diceCthulhu = require('../lib/diceCthulhu');

describe("Dice suite", function() {
  it("rollPercentiles returns digits each 0-9", function() {
    expect(diceCthulhu.rollCheck(null, {rollPercentiles: function() {return [1,2];}, totalOfPercentilesRoll: function() {return 12;}}, ""))
      .toBe("rolled percentiles and got *12* (1, 2)");
    expect(diceCthulhu.rollCheck(null, {rollPercentiles: function() {return [0,0];}, totalOfPercentilesRoll: function() {return 100;}}, ""))
      .toBe("rolled percentiles and got *100* (0, 0)");
    // TODO: add tests for bonus and penalty - need to be able to specify different results for rollPercentiles
  });
});
