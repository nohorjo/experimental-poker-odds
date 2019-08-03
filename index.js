const program = require('commander');

const runExperiment = require('./experiment');

program
    .version(require('./package').version, '-v, --version')
    .option('-p, --players <n>', 'Number of other players', parseInt)
    .option('-s, --starting-hand <s>', 'Starting hand eg "AsTd" = Ace of Spades and Ten of Diamonds, or "q2u" = Queen and Two unsuited, or "77" = pocket Sevens, or "9t" = Nine and Ten suited')
    .option('-c, --community-cards [s]', 'Three, four or five comminity cards eg "Ks7sAh" = King of Spades, Seven of Spades and Ace of Hearts')
    .option('-n, --number-of-runs [n]', 'Number of thousands of runs eg 5 = 5000 runs', parseInt)
    .parse(process.argv);

if (
    !program.players
    || !program.startingHand
) {
    program.help();
}


runExperiment({
    numberOfRuns: program.numberOfRuns * 1000 || Infinity,
    baseCommunityString: program.communityCards,
    startingHandString: program.startingHand,
    numberOfPlayers: program.players,
});
