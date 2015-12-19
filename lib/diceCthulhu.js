var dice = require('./diceGeneral')

// rolls a check per Cthulhu rpg rules
// rollData should be one of ParseC_Bonus, ParseC_Penalty, or ParseC_None
// This correspond to rolling with a bonus die, penalty die, or no extra die
exports.rollCheck = function(chance, rollData)
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
