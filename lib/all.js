var chance = require('chance')
var dice = require('./diceGeneral')
var diceParsing = require('./diceParsing')


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
function doRollForC(rollData)
{
    if (rollData === null)
        return null;

    var originalRoll = dice.rollPercentiles(chance);
    var total = dice.totalOfPercentilesRoll(originalRoll);

    var diceExplained = " (" + String(originalRoll[0]) + ", " + String(originalRoll[1]);
    if (rollData == "ParseC_Bonus")
    {
        var bonusDie = dice.rollPercentiles(chance)[0];
        var bonusRoll = [bonusDie, originalRoll[1]];
        diceExplained += ", bonus=" + String(bonusDie);

        total = Math.min(total, dice.totalOfPercentilesRoll(bonusRoll));
    }
    else if (rollData == "ParseC_Penalty")
    {
        var penaltyDie = dice.rollPercentiles(chance)[0];
        var penaltyRoll = [penaltyDie, originalRoll[1]];
        diceExplained += ", penalty=" + String(penaltyDie);

        total = Math.max(total, dice.totalOfPercentilesRoll(penaltyRoll));
    }
    diceExplained += ")";

    return "rolled percentiles and got *" + String(total) + "*" + diceExplained;
}

exports.handler = function(event, context) {
    if (event.text)
    {
        var responseC = doRollForC(parseDiceTextForC(event.text));
        if (responseC !== null)
        {
            context.done(null, {"response_type": "in_channel", "text" : event.user_name + " " + responseC, "mrkdwn": true});
            return;
        }

        var rollData = diceParsing.parseForGeneralDiceRoll(event.text);
        if (rollData === null || rollData.length < 4)
        {
            var response = event.text +" is not something I understand.";
            if (rollData !== null)
                response += " (I matched: " + rollData[0] + ").";
            context.done(null, {"text" : response});
        }
        else
        {
            var roll = dice.rollDice(chance, {sides: rollData[2], numOfDice: rollData[1]});
            var total = totalOfRoll(roll) + rollData[3];
            var response = event.user_name + " rolled " + diceTextFromParsed(rollData) + " and got *" + String(total) + "*";
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
            context.done(null, {"response_type": "in_channel", "text" : response, "mrkdwn": true});
        }
    }

    if (!event.text) {
        context.error('Please specify dice');
        return;
    }

    // Log process stdout and stderr
    child.stdout.on('data', console.log);
    child.stderr.on('data', console.error);
};
