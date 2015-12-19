var chance = require('chance')
var dice = require('./diceGeneral')
var diceParsing = require('./diceParsing')
var diceCthulhu = require('./diceCthulhu')


exports.handler = function(event, context) {
    if (event.text)
    {
        var responseC = diceCthulhu.rollCheck(chance, diceParsing.parseForCthulhu(event.text));
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
            var response = event.user_name + " rolled " + diceParsing.textFromParsedDiceRoll(rollData) + " and got *" + String(total) + "*";
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
    //child.stdout.on('data', console.log);
    //child.stderr.on('data', console.error);
};
