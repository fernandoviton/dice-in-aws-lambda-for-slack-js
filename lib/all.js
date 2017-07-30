// return a random number between min and max, inclusive
function rollFunc(min, max)
{
    var range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}

// return a random result of a die rolled with 'sides' sides
function rollDie(roll, sides)
{
    return roll(1, sides);
}

// return an array of size 'number', with each element having random result of a roll from a die with 'sides' sides
function rollDice(roll, number, sides)
{
    var diceRolled = [];
    while(number-- > 0)
    {
        diceRolled.push(rollDie(roll, sides));
    }
    return diceRolled;
}

// return an array consisting of 2 results each representing a die used in a percentile calculation
function rollPercentiles(roll)
{
    //return roll(0, 1) == 1 ? [0,0] : [10,0];
    return [roll(0, 9)*10, roll(0, 9)];
}

// given a result of a rollPercentiles call, translate it to the actual percentile value
function interpretPercentiles(diceRolled)
{
    var total = diceRolled[0] + diceRolled[1];
    if (total === 0)
        return 100;
    return total;
}

// given the results of a rollDice call, return the sum of the rolls
function totalOfRoll(diceRolled)
{
    return diceRolled.reduce(function(a, b) { return a + b; });
}

// given something like '3d10+5' parse it to figure out how many dice to roll of what types
// the result is an array with '3', '10', and '5' in that order (for the example given)
function parseDiceText(diceText)
{
    var re = /^(\d+)?d(\d+)(?: *\+ *(\d+))?$/;
    var match = diceText.match(re);
    if (match === null)
        return null;

    var ret = [];
    ret.push(match[0]); // the full match ("3d10+5" in the example above)
    ret.push(match[1] !== undefined ? parseInt(match[1],10) : 1); // the '3' in example above -> optional
    ret.push(parseInt(match[2], 10)); // the '10' in example above -> required
    ret.push(match[3] !== undefined ? parseInt(match[3],10) : 0); // the '5' in the example above -> required

    return ret;
}

// given a result from parseDiceText, reform to the text equvialent of it
// this may be syntatically different than the original - but should be logically equivalent
function diceTextFromParsed(diceParsed)
{
    var s = String(diceParsed[1]) + "d" + String(diceParsed[2]);
    if (diceParsed[3] !== 0)
        s+= "+" + String(diceParsed[3]);
    return s;
}

// Cthulhu specific parsing
function parseDiceTextForC(text)
{
    var re = /^c( [p|b])?$/;
    var match = text.match(re);
    if (match === null)
        return null;

    if (match[1] === undefined) return "ParseC_None";
    if (match[1] == ' p') return "ParseC_Penalty";
    if (match[1] == ' b') return "ParseC_Bonus";
    return null;
}

//Cthulhu rolling
function doRollForC(roll, rollData)
{
    if (rollData === null)
        return null;

    var originalRoll = rollPercentiles(roll);
    var total = interpretPercentiles(originalRoll);

    var diceExplained = " (" + String(originalRoll[0]) + ", " + String(originalRoll[1]);
    if (rollData == "ParseC_Bonus")
    {
        var bonusDie = rollPercentiles(roll)[0];
        var bonusRoll = [bonusDie, originalRoll[1]];
        diceExplained += ", bonus=" + String(bonusDie);

        total = Math.min(total, interpretPercentiles(bonusRoll));
    }
    else if (rollData == "ParseC_Penalty")
    {
        var penaltyDie = rollPercentiles(roll)[0];
        var penaltyRoll = [penaltyDie, originalRoll[1]];
        diceExplained += ", penalty=" + String(penaltyDie);

        total = Math.max(total, interpretPercentiles(penaltyRoll));
    }
    diceExplained += ")";

    return "rolled percentiles and got *" + String(total) + "*" + diceExplained;
}

function parseDiceTextForNewCharacter(text)
{
    var re = /^newCharacter$/;
    var match = text.match(re);
    if (match === null)
        return null;

    return "NewChacter_None";
}

function roll4d6No1s(roll)
{
    return Array.apply(null, {length: 4}).map(_ => roll(2,6));
}

function getNewChracterAttributeAsText(roll)
{
    const diceRolled = roll4d6No1s(roll);
    const minItem = Math.min.apply(null, diceRolled);
    const total = diceRolled.reduce((sum, value) => sum + value) - minItem;
    const rollExplained = diceRolled.toString();

    return rollExplained + '=*' + total +'*';
}

function doRollForNewCharacter(roll, rollData)
{
    if (rollData === null)
        return null;

    const startText = 'rolled (re-rolling 1s and dropping lowest):\n';
    const rollsAsText = Array.apply(null, {length: 6})
        .map(() => getNewChracterAttributeAsText(roll))
        .reduce((sum, value) => sum + '\n' + value);

    return startText + rollsAsText;
}

const handlerImpl = (roll, userName, text) =>
{
    if (text)
    {
        var responseC = doRollForC(roll, parseDiceTextForC(text));
        if (responseC !== null)
        {
            return {result: {"response_type": "in_channel", "text" : userName + " " + responseC, "mrkdwn": true}};
        }

        var responseNewCharacter = doRollForNewCharacter(roll, parseDiceTextForNewCharacter(text));
        if (responseNewCharacter !== null)
        {
           return {result: {"response_type": "in_channel", "text" : userName + " " + responseNewCharacter, "mrkdwn": true}};
        }

        var rollData = parseDiceText(text);
        if (rollData === null || rollData.length < 4)
        {
            var response = text +" is not something I understand.";
            if (rollData !== null)
                response += " (I matched: " + rollData[0] + ").";
            return {result: {"text" : response}};
        }
        else
        {
            var roll = rollDice(roll, rollData[1], rollData[2]);
            var total = totalOfRoll(roll) + rollData[3];
            var response = userName + " rolled " + diceTextFromParsed(rollData) + " and got *" + String(total) + "*";
            if (roll.length > 1 || rollData[3] !== 0)
            {
                response += " (Dice=";
                for (var i = 0; i < roll.length; i++)
                {
                    response += String(roll[i]);
                    if (i < roll.length - 1)
                        response += ",";
                }
                response += ")";
            }
            return {result: {"response_type": "in_channel", "text" : response, "mrkdwn": true}};
        }
    }
    else
    {
        return {error: 'Please specify dice'};
    }
}

exports.handlerImpl = handlerImpl;

exports.handler = function(event, context, callback) {
    const results = handlerImpl(rollFunc, event.user_name, event.text);

    if (results !== null)
    {
        callback(results.error, results.result);
        // Log process stdout and stderr
        //child.stdout.on('data', console.log);
        //child.stderr.on('data', console.error);
    }
};
