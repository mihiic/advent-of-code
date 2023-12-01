const fs = require("node:fs")

const raw = fs.readFileSync("./inputs.txt").toString('utf-8');
const inputs = raw.split('\n');

const textDigits = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine'
]

let sum = 0;
let count = 0;
for (const input of inputs) {
	if (!input.length) {
		continue;
	}
	count += 1;

	const digits = [];	
	let i = 0;
	while (i <= input.length) {
		if (!isNaN(input[i])) {
			digits.push(input[i]);
			i++;
			continue;
		}

		const truncated = input.slice(i);
		for (let j = 0; j < textDigits.length; j++) {
			if (truncated.startsWith(textDigits[j])) {
				digits.push(j);
				break;
			}
		}
		i++;
	}
	const num = +(`${digits[0]}${digits[digits.length - 1]}`);

	console.log(`${input} -> ${digits} ${digits[0]}${digits[digits.length - 1]}`, num);
	sum += num;
}

console.log(`Sum is: ${sum}`);
console.log(`Count is: ${count}`);
