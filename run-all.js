const program = require('commander');

const allStartingHands = require('./all-starting-hands');
const runExperiment = require('./experiment');

program
    .version(require('./package').version, '-v, --version')
    .option('-n, --number-of-runs [n]', 'Number of runs', parseInt)
    .option('-p, --players <n>', 'Number of other players', parseInt)
    .parse(process.argv);

if (
    !program.numberOfRuns
    || !program.players
) {
    program.help();
}
allStartingHands.forEach(hand => {
    console.log('Starting hand', hand);

    runExperiment({
        numberOfRuns: program.numberOfRuns,
        startingHandString: hand,
        numberOfPlayers: program.players,
    });
});
