var chance = require('chance')
var dice = require('./diceGeneral')
var diceParsing = require('./diceParsing')
var diceCthulhu = require('./diceCthulhu')


exports.handler = function(event, context) {
    if (event.text)
    {
        var responseC = diceCthulhu.rollCheck(chance, dice, diceParsing.parseForCthulhu(event.text));
        if (responseC !== null)
        {
            context.done(null, {"response_type": "in_channel", "text" : event.user_name + " " + responseC, "mrkdwn": true});
            return;
        }

        var rollData = dice.getRollDataFromParsedRoll(diceParsing.parseForGeneralDiceRoll(event.text));
        if (rollData === null)
        {
            var parsedRollData = diceParsing.parseForGeneralDiceRoll(event.text);
            var response = event.text +" is not something I understand.";
            if (parsedRollData !== null)
                response += " (I matched: " + parsedRollData[0] + ").";
            context.done(null, {"text" : response});
        }
        else
        {
            var roll = dice.rollDice(chance, rollData);
            var total = dice.totalOfRoll(roll, rollData.add);
            var response = event.user_name + " rolled " + dice.textFromRollData(rollData) + " and got *" + String(total) + "*";
            if (roll.length > 1 || rollData.add !== 0)
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
    //child.stdout.on('data', console.log);
    //child.stderr.on('data', console.error);
};
