const fs = require("node:fs")

const raw = fs.readFileSync("./inputs.txt").toString('utf-8');
const inputs = raw.split('\n');

const limits = {
	'red': 12,
	'green': 13,
	'blue': 14
}

let sum = 0;
for (const input of inputs) {
	if (!input.length) {
		continue;
	}

	const [game, data] = input.split(': ');
	const sets = data.split(';').map(s => s.trim());

	console.log('current game', input);

	let possible = true;
	for (const s of sets) {
		const values = s.split(',').map(val => val.trim());

		for (const val of values) {
			const [num, color] = val.split(' ');
			console.log(values, num, color);

			if (limits[color] < num) {
				possible = false;
				break;
			}
		}
		if (!possible) {
			break;
		}
	}
	if (!possible) {
		console.log('Impossible game: ', input);
		continue;
	}
	
	const gameId = game.split(' ')[1];
	sum += +gameId;
}

console.log('Sum of possible games is: ', sum);

