const allStartingHands = require('./all-starting-hands');
const runExperiment = require('./experiment');

allStartingHands.forEach(hand => {
    console.log('Starting hand', hand);

    runExperiment({
        numberOfRuns: 30,
        startingHandString: hand,
        numberOfPlayers: 3,
    });
});
