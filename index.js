const program = require('commander');

const runExperiment = require('./experiment');

program
    .version(require('./package').version, '-v, --version')
    .option('-p, --players <n>', 'Number of other players', parseInt)
    .option('-s, --starting-hand <s>', 'Starting hand eg "AsTd" = Ace of Spades and Ten of Diamonds')
    .option('-c, --community-cards [s]', 'Three, four or five comminity cards eg "Ks7sAh" = King of Spades, Seven of Spades and Ace of Hearts')
    .option('-n, --number-of-runs [n]', 'Number of thousands of runs eg 5 = 5000 runs', parseInt)
    .parse(process.argv);

if (
    !program.players
    || !program.startingHand
) {
    program.help();
}

const getCardFromString = (string, index) => string.substr(index, 2).split('').map((c, i) => c[i ? 'toLowerCase' : 'toUpperCase']()).join('');

const startingHand = [
    getCardFromString(program.startingHand, 0),
    getCardFromString(program.startingHand, 2),
];

const baseCommunity = [];

if (program.communityCards) {
    for (let i = 0; i < program.communityCards.length; i += 2) {
        baseCommunity.push(getCardFromString(program.communityCards, i));
    }
}

runExperiment({
    numberOfRuns: program.numberOfRuns * 1000 || Infinity,
    baseCommunity,
    startingHand,
    numberOfPlayers: program.players,
});
