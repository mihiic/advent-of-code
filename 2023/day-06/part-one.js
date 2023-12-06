const fs = require('node:fs')

const inputs = fs.readFileSync('./inputs.txt').toString();

const [races, records] = inputs.split('\n')
                               .map(i => i.trim())
                               .filter(i => i.length)
                               .map(line => { 
                                   return line.split(': ')[1].trim();
                               })
                               .map(line => {
                                   return line.split(' ');
                               })
                               .map(line => {
                                   return line.filter(l => l.length).map(n => +n);
                               });
const combinations = [];
for (let i = 0; i < races.length; i++) {
    const min = minDuration(races[i], records[i]);
    const c = (races[i] + 1) - 2 * min;
    combinations.push(c);
}

let product = 1;
for (let c of combinations) {
    product *= c;
}
console.log(product);

function minDuration(duration, target) {
    for (let i = 1; i < duration; i++) {
        if (duration * i - i * i > target) {
            return i;
        }
    }
}
