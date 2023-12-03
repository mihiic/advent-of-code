const fs = require('node:fs');

const input = fs.readFileSync('./inputs.txt').toString();

let floor = 0;
for (const c of input) {
	if (c === '(') {
		floor += 1;
	}

    if (c === ')') {
        floor -= 1;
    }
}

console.log(`Target floor: ${floor}`);

