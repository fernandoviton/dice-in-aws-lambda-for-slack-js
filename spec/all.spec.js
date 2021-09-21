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
  it("with d4", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 'd4', doneFunc, errorFunc);
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
  it("with s 1d4", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with s 1d4 1d6", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4 1d6', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with s only", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's', doneFunc, errorFunc);
    expect(result.result.text).toContain('You need to specify dice');
  });
  it("with s 1d4 15", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4 15', doneFunc, errorFunc);
    expect(result.result.text).toContain('understand');
  });
  it("with s 1d4+2", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4+2', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with s 1d4 w", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's 1d4 w', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with s w", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's w', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with card", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 'card', doneFunc, errorFunc);
    expect(result.result.text).toContain('drew');
  });
  it("with s 1d4 extra space", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', 's  1d4', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with 1d4 extra space", function() {
    var responseData = null;
    const roll = (min, max) => 4;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', ' 1d4', doneFunc, errorFunc);
    expect(result.result.text).toBe('myUser rolled 1d4 and got *4*');
  });
  it("with s 1d4 extra space before the s", function() {
    var responseData = null;  
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', ' s 1d4', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with 1d4 1d6", function() {
    var responseData = null;
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', '1d4 1d6', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
  it("with 1d4 1d6  1d8", function() {
    var responseData = null;
    const roll = All.rollFunc;
    const doneFunc = (_, r) => { responseData = r; };
    const errorFunc = (_, __) => {};
    const result = All.handlerImpl(roll, 'myUser', '1d4 1d6  1d8', doneFunc, errorFunc);
    expect(result.result.text).toContain('rolled');
  });
});

