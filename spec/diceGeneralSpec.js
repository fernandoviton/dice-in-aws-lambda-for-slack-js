var All = require('../lib/all.js');

describe("handler", function() {
  it("with 1d4", function() {
    var doneFunc = (_, __) => {};
    var errorFunc = (_, __) => {};
    const result = All.handlerImpl('user', '1d4', doneFunc, errorFunc);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(5);
  });
});
