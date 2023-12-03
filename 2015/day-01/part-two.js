const fs = require('node:fs');

const input = fs.readFileSync('./inputs.txt').toString();

let step = 0;
let floor = 0;
for (const c of input) {
    step += 1;
	if (c === '(') {
		floor += 1;
	}

    if (c === ')') {
        floor -= 1;
    }

    if (floor === -1) {
        console.log('Entered basement at step: ', step);
        break;
    }
}

console.log(`Target floor: ${floor}`);

