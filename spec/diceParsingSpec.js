var diceParsing = require('../lib/diceParsing');

describe("Dice parsing test suite", function() {
  it("general dice parsing returns null for various cases", function() {
    expect(diceParsing.parseForGeneralDiceRoll("3")).toBe(null);
    expect(diceParsing.parseForGeneralDiceRoll("d")).toBe(null);
    expect(diceParsing.parseForGeneralDiceRoll("3d")).toBe(null);
    expect(diceParsing.parseForGeneralDiceRoll("3a5")).toBe(null);
    expect(diceParsing.parseForGeneralDiceRoll("3d5+")).toBe(null);
    expect(diceParsing.parseForGeneralDiceRoll("3 d5")).toBe(null);
    expect(diceParsing.parseForGeneralDiceRoll("3d 5")).toBe(null);
  });

  it("general dice parsing for cases with an implicitly single die", function() {
    expect(diceParsing.parseForGeneralDiceRoll("d6")).toEqual(["d6", 1, 6, 0]);
    expect(diceParsing.parseForGeneralDiceRoll("d8+5")).toEqual(["d8+5", 1, 8, 5]);
    expect(diceParsing.parseForGeneralDiceRoll("d8 + 5")).toEqual(["d8 + 5", 1, 8, 5]);
  });

  it("general dice parsing for cases with an number of dice specified", function() {
    expect(diceParsing.parseForGeneralDiceRoll("1d6")).toEqual(["1d6", 1, 6, 0]);
    expect(diceParsing.parseForGeneralDiceRoll("2d6")).toEqual(["2d6", 2, 6, 0]);
    expect(diceParsing.parseForGeneralDiceRoll("3d4+3")).toEqual(["3d4+3", 3, 4, 3]);
    expect(diceParsing.parseForGeneralDiceRoll("3d4 + 3")).toEqual(["3d4 + 3", 3, 4, 3]);
  });
});
