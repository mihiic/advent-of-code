const fs = require('node:fs');

const inputs = fs.readFileSync('./inputs.txt').toString();
const cards = inputs.split('\n')
					.filter(input => input.length)
					.map(c => c.split(': ')[1].trim());

let sum = 0;
for (const card of cards) {
	let [winners, numbers] = card.split(' | ').map(c => c.split(' '));
	winners = winners.filter(w => w.length);	
	numbers = numbers.filter(w => w.length);	

	let hits = 0;
	for (const num of numbers) {
		if (winners.indexOf(num) > -1) {
			hits += 1;
		}
	}
	if (hits) {
		sum += Math.pow(2, hits - 1);
	}
}
console.log('Sum of cards is: ', sum);
