const program = require('commander');
 
program
    .version(require('./package').version, '-v, --version')
    .option('-p, --players', 'Number of players', parseInt)
    .option('-s, --starting-hand', 'Starting hand eg "AS2D" = Ace of Spades and Deuce Diamonds', )
    .parse(process.argv);
 
console.log('you ordered a pizza with:');
if (program.peppers) console.log('    - peppers');
if (program.pineapple) console.log('    - pineapple');
if (program.bbqSauce) console.log('    - bbq');
console.log('    - %s cheese', program.cheese);
