const fs = require('node:fs');

const inputs = fs.readFileSync('./inputs.txt').toString();

const boxes = inputs.split('\n');

let total = 0;
for (const box of boxes) {
    if (!box.length) {
        continue;
    }

    let [l, w, h] = box.split('x').map(x => +x).sort((a, b) => a - b);
    console.log(l, w, h);
    const additional = l * w * h;
    const length = 2*l + 2*w;

    total += length + additional;
}

console.log('Paper area: ', total);
