const fs = require('node:fs');

const inputs = fs.readFileSync('./inputs.txt').toString();
const cards = inputs.split('\n')
					.filter(input => input.length)
					.map(c => {
						let parts = c.split(': ');
						const id = parts[0].split('Card ')[1];
						const values = parts[1].trim();
						console.log(+id);

						return {
							id: +id,
							val: values
						}
					});

let sum = 0;
let workingSet = Array.from(cards);
let i = 0;
while (i < workingSet.length) {
	const card = workingSet[i];
	let [winners, numbers] = card.val.split(' | ').map(c => c.split(' '));
	winners = winners.filter(w => w.length);	
	numbers = numbers.filter(w => w.length);	

	let hits = 0;
	for (const num of numbers) {
		if (winners.indexOf(num) > -1) {
			hits += 1;
		}
	}
	if (hits) {
		let id = card.id;
		for (let j = 0; j < hits; j++) {
			workingSet.push(cards[id + j]);
		}
	}
	i++;
}
console.log('Sum of cards is: ', workingSet.length);

