const suits = ['s', 'd', 'c', 'h'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

const getDeck = () => ranks.map(rank => suits.map(suit => `${rank}${suit}`)).reduce((a, b) => [...a, ...b], []);

module.exports = {
    getDeck,
    getShuffledDeck: () => getDeck().sort(() => Math.random() - 0.5),
};
