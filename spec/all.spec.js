var All = require('../lib/all.js');

describe("handler", function() {
  it("with c", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 'c', doneFunc, errorFunc);
    expect(result.result.text).toBe('myUser rolled percentiles and got *44* (40, 4)');
  });
  it("with 1d4", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', '1d4', doneFunc, errorFunc);
    expect(result.result.text).toBe('myUser rolled 1d4 and got *4*');
  });
  it("with 1d4+2", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', '1d4+2', doneFunc, errorFunc);
    expect(result.result.text).toBe('myUser rolled 1d4+2 and got *6* (Dice=4)');
  });
  it("with 1d4-2", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', '1d4-2', doneFunc, errorFunc);
    expect(result.result.text).toBe('myUser rolled 1d4-2 and got *2* (Dice=4)');
  });
  it("with newCharacter", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', '1d4', doneFunc, errorFunc);
    expect(result.result.text).not.toBe(null);
  });
  it("with s", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with s 2", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4 1d6', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with s 3", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's', doneFunc, errorFunc);
    expect(result.result.text).toContain('You need to specify dice');
  });
  it("with s 4", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4 15', doneFunc, errorFunc);
    expect(result.result.text).toContain('understand');
  });
  it("with s 5", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4+2', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with s 6", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4 w', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with s 7", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's w', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with s 8", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 'card', doneFunc, errorFunc);
    expect(result.result.text).toContain('drew');
  });
});

