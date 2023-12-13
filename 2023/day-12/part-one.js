const fs = require('node:fs');

const inputs = fs.readFileSync('./sample.txt')
    .toString()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length);

let problems = [];
for (let input of inputs) {
    const parts = input.split(' ');
    const damagedGroupSizes = parts[1].split(',').map(g => +g);

    const segments = parts[0].split('.').filter(segment => segment.length);
    console.log(segments, damagedGroupSizes);
    problems.push({
        segments: segments,
        damagedGroupSizes: damagedGroupSizes,
        dotsNeeded: damagedGroupSizes.length - segments.length
    });
}

console.log(problems);
