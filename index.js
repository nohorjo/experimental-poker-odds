const program = require('commander');
const { Hand } = require('pokersolver');

const suits = ['s', 'd', 'c', 'h'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

program
    .version(require('./package').version, '-v, --version')
    .option('-p, --players <n>', 'Number of players', parseInt)
    .option('-s, --starting-hand <s>', 'Starting hand eg "AsTd" = Ace of Spades and Ten of Diamonds', )
    .parse(process.argv);

const startingHand = [
    program.startingHand.substr(0, 2).split('').map((c, i) => c[i ? 'toLowerCase' : 'toUpperCase']()).join(''),
    program.startingHand.substr(2, 2).split('').map((c, i) => c[i ? 'toLowerCase' : 'toUpperCase']()).join(''),
];

const getDeck = () => ranks
    .map(rank => suits.map(suit => `${rank}${suit}`)).reduce((a, b) => [...a, ...b], [])
    .filter(card => !startingHand.includes(card))
    .sort(() => Math.random() - 0.5);

for (let runs = 1, wins = 0;; runs++) {
    const deck = getDeck();
    const others = [];

    for (let p = program.players; p; p--) {
        others.push(deck.splice(0, 2));
    }

    const community = deck.splice(0, 5);
    const yourHand = Hand.solve([...startingHand, ...community]);
    const otherHands = others.map(hand => Hand.solve([...hand, ...community]));

    const [ winner ] = Hand.winners([yourHand, ...otherHands]);
    
    if (yourHand === winner)
        wins++;

    console.log(`Runs: ${runs}, Wins: ${wins} - ${((wins * 100) / runs).toFixed(2)}%`);
}
