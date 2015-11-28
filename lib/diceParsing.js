// parse for something like '3d10+5' as the input string
// if not found return null, otherwise
// return an array of matches for each piece:
// the first item is the match of the full string we were looking for (XdY+Z)
// then the array will contain X, Y, and Z in that order.
// X and Z are allowed to be omitted from the src string, in which case they are 1 and 0 respectively
exports.parseForGeneralDiceRoll = function(s)
{
  var re = /^(\d+)?d(\d+)(?: *\+ *(\d+))?$/;
  var match = s.match(re);
  if (match === null)
      return null;

  var ret = [];
  ret.push(match[0]); // the full match ("3d10+5" in the example above)
  ret.push(match[1] !== undefined ? parseInt(match[1],10) : 1); // the '3' in example above -> optional
  ret.push(parseInt(match[2], 10)); // the '10' in example above -> required
  ret.push(match[3] !== undefined ? parseInt(match[3],10) : 0); // the '5' in the example above -> required

  return ret;
}

exports.textFromParsedDiceRoll = function(diceParsed)
{
  if (diceParsed.length != 4) throw "Unexpected Input Length";
  
  var s = String(diceParsed[1]) + "d" + String(diceParsed[2]);
  if (diceParsed[3] !== 0)
      s+= "+" + String(diceParsed[3]);
  return s;
}
