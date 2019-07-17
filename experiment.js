const { Hand } = require('pokersolver');

const { getShuffledDeck } = require('./deck');

const getDeck = ({
    startingHand,
    baseCommunity,
}) => getShuffledDeck().filter(card => !startingHand.includes(card) && !baseCommunity.includes(card));

module.exports = ({
    numberOfRuns,
    baseCommunity,
    startingHand,
    numberOfPlayers,
}) => {
    let wins = 0;
    for (let runs = 1; runs < numberOfRuns; runs++) {
        const deck = getDeck({startingHand, baseCommunity});
        const others = [];

        for (let p = numberOfPlayers; p; p--) {
            others.push(deck.splice(0, 2));
        }

        const community = [...baseCommunity, ...deck.splice(0, 5 - baseCommunity.length)];
        const yourHand = Hand.solve([...startingHand, ...community]);
        const otherHands = others.map(hand => Hand.solve([...hand, ...community]));

        const [ winner ] = Hand.winners([yourHand, ...otherHands]);
        
        if (yourHand === winner)
            wins++;
        
        if (numberOfRuns === Infinity)
            process.stdout.write(`Runs: ${runs}, Wins: ${wins} - ${((wins * 100) / runs).toFixed(2)}%\r`);
    }

    console.log(`Runs: ${numberOfRuns}, Wins: ${wins} - ${((wins * 100) / numberOfRuns).toFixed(2)}%`);
};
