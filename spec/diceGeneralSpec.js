var All = require('../lib/all.js');

describe("handler", function() {
  it("with c", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 'c', doneFunc, errorFunc);
    expect(result).toBe(true);
    expect(responseData.text).toBe('myUser rolled percentiles and got *44* (40, 4)');
  });
  it("with 1d4", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', '1d4', doneFunc, errorFunc);
    expect(result).toBe(true);
    expect(responseData.text).toBe('myUser rolled 1d4 and got *4*');
  });
  it("with newCharacter", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', '1d4', doneFunc, errorFunc);
    expect(result).toBe(true);
    expect(responseData.text).not.toBe(null);
  });
});

