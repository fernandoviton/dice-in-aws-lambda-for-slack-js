var diceCthulhu = require('../lib/diceCthulhu');
var dice = require('../lib/diceGeneral');
var chance = require('chance')

var mock = function( constr, name ) {
  var keys = [];
  for( var key in constr.prototype ) {
    keys.push( key );
  }
  return keys.length > 0 ? jasmine.createSpyObj( name || "mock", keys ) : {};
};
// Usage:
//var Chance = function(){};
//Chance.prototype.d10 = function(){};
//var chanceMock = mock(Chance);

describe("diceCthulhu.rollCheck", function() {
  var returnPercentiles = [];
  var nextPercentileToReturn = 0;
  var diceMock = mock(dice);
  var chanceMock = mock(chance);
  diceMock.totalOfPercentilesRoll = function(rollData) {return dice.totalOfPercentilesRoll(rollData);};
  diceMock.rollPercentiles = function(chance)
  {
    if (chance != chanceMock) throw "expected chance not passed";
    var ret = returnPercentiles[nextPercentileToReturn];
    nextPercentileToReturn += 1;
    return ret;
  };

  beforeEach(function ()
  {
    returnPercentiles = [];
    nextPercentileToReturn = 0;
  });

  it("should roll and describe basic checks", function() {
    returnPercentiles = [[10,2]];
    expect(diceCthulhu.rollCheck(chanceMock, diceMock, ""))
      .toBe("rolled percentiles and got *12* (10, 2)");
  });
});

/*
describe("diceCthulhu", function() {
  it("rollCheck", function() {
    expect(diceCthulhu.rollCheck(null, dice, ""))
      .toBe("rolled percentiles and got *12* (1, 2)");
    expect(diceCthulhu.rollCheck(null, {rollPercentiles: function() {return [1,2];}, totalOfPercentilesRoll: function() {return 12;}}, ""))
      .toBe("rolled percentiles and got *12* (1, 2)");
    expect(diceCthulhu.rollCheck(null, {rollPercentiles: function() {return [0,0];}, totalOfPercentilesRoll: function() {return 100;}}, ""))
      .toBe("rolled percentiles and got *100* (0, 0)");
    //setRollPercentilesMock([[1,2], [3,4]]);
    expect(diceCthulhu.rollCheck(null, {rollPercentiles: rollPercentilesMock, totalOfPercentilesRoll: totalOfPercentilesRollMock}, "ParseC_Bonus"))
      .toBe("sfdfsdf");
    // TODO: add tests for bonus and penalty - need to be able to specify different results for rollPercentiles
  });
});*/
