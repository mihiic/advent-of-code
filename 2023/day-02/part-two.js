const fs = require("node:fs")

const raw = fs.readFileSync("./sample.txt").toString('utf-8');
const inputs = raw.split('\n');

let sum = 0;
for (const input of inputs) {
	if (!input.length) {
		continue;
	}

	const [game, data] = input.split(': ');
	const sets = data.split(';').map(s => s.trim());

	const minSet = {
		'red': 0,
		'green': 0,
		'blue': 0
	};

	console.log(input);
	console.log(sets);
	let possible = true;
	for (const s of sets) {
		const values = s.split(',').map(val => val.trim());

		for (const val of values) {
			const [num, color] = val.split(' ');

			if (minSet[color] < num) {
				minSet[color] = num;
			}
		}
	}
	
	// const gameId = game.split(' ')[1];
	// sum += +gameId;
}

console.log('Sum of possible games is: ', sum);

