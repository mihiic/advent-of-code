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
                                   return line.filter(l => l.length).join('');
                               });
const min = minDuration(+races, +records);
const c = (+races + 1) - 2 * min;
console.log(c);

function minDuration(duration, target) {
    for (let i = 1; i < duration; i++) {
        if (duration * i - i * i > target) {
            return i;
        }
    }
}
