const fs = require('node:fs');

const raw = fs.readFileSync('./inputs.txt').toString();
const inputs = raw.split('\n').map(x => x.trim()).filter(n => n.length);

let sum = 0;
for (let i = 0; i < inputs.length; i++) {
    const current = inputs[i];
    for (let j = 0; j < current.length; j++) {
        if (isNaN(current[j])) {
            continue;
        }
        const start = j;

        while (!isNaN(current[j])) {
            j++;
        }

        for (let x = Math.max(start - 1, 0); x < Math.min(j + 1, current.length); x++) {
            for (let y = Math.max(i - 1, 0); y < Math.min(i + 2, inputs.length); y++) {
                if (!isNaN(inputs[y][x])) {
                    continue;
                }

                if (inputs[y][x] === '.') {
                    continue;
                }

                console.log('part number: ', current.slice(start, j));
                sum += +current.slice(start, j);
            }
        }
    }
}

console.log('Sum of parts: ', sum);
