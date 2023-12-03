const fs = require('node:fs');

const inputs = fs.readFileSync('./inputs.txt').toString();

const boxes = inputs.split('\n');

let total = 0;
for (const box of boxes) {
    if (!box.length) {
        continue;
    }

    let [l, w, h] = box.split('x');
    const lw = l * w;
    const lh = l * h;
    const wh = w * h;

    const additional = Math.min(lw, lh, wh);
    const area = 2*lw + 2*lh + 2*wh;

    total += area + additional;
}

console.log('Paper area: ', total);

