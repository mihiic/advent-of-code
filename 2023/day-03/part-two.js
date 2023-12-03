const fs = require('node:fs');

const raw = fs.readFileSync('./inputs.txt').toString();
const inputs = raw.split('\n').map(x => x.trim()).filter(n => n.length);

let sum = 0;
let adjecents = {};
for (let i = 0; i < inputs.length; i++) {
    const current = inputs[i];
    for (let j = 0; j < current.length; j++) {
        if (current[j] !== '*') {
            continue;
        }

        for (let y = Math.max(i - 1, 0); y < Math.min(i + 2, inputs.length); y++) {
            for (let x = Math.max(j - 1, 0); x < Math.min(j + 2, current.length); x++) {
                if (isNaN(inputs[y][x])) {
                    continue;
                }

                let start = x;
                let end = x;

                while (!isNaN(inputs[y][start])) {
                    start -= 1;
                }

                while (!isNaN(inputs[y][end])) {
                    end += 1;
                }
                start += 1;

                if (end > x) {
                    x = end;
                }
                
                const part = inputs[y].slice(start, end);
                const key = `${i}, ${j}`;
                adjecents[key] = adjecents[key] ? adjecents[key].concat(part) : [part];
            }
        }
    }
}

console.log(adjecents);

for (const key in adjecents) {
    const values = adjecents[key];
    if (values.length !== 2) {
        continue;
    }

    sum += values[0] * values[1];
}
console.log('Sum of parts: ', sum);
