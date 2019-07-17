const program = require('commander');
const { Hand } = require('pokersolver');

const suits = ['s', 'd', 'c', 'h'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

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

const getDeck = () => ranks
    .map(rank => suits.map(suit => `${rank}${suit}`)).reduce((a, b) => [...a, ...b], [])
    .filter(card => !startingHand.includes(card) && !baseCommunity.includes(card))
    .sort(() => Math.random() - 0.5);

const numberOfRuns = program.numberOfRuns * 1000 || Infinity;
let wins = 0;

for (let runs = 1; runs < numberOfRuns; runs++) {
    const deck = getDeck();
    const others = [];

    for (let p = program.players; p; p--) {
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
