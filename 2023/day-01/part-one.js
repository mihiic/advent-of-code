const fs = require("node:fs")

const raw = fs.readFileSync("./inputs.txt").toString('utf-8');
const inputs = raw.split('\n');

let sum = 0;
for (const input of inputs) {
	if (!input.length) {
		continue;
	}

	const digits = [];	
	for (let i = 0; i < input.length; i++) {
		let c = input[i];
		if (!isNaN(c)) {
			digits.push(c);
		}
	}
	const num = +(`${digits[0]}${digits[digits.length - 1]}`);
	sum += num;
}

console.log(`Sum is: ${sum}`);

