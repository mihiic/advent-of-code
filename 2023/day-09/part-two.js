const fs = require('node:fs');

const inputs = fs.readFileSync('./inputs.txt')
    .toString()
    .split('\n')
    .filter(line => line.length);

let sum = 0;
for (const line of inputs) {
    sum += extrapolateValue(line);
}
console.log(sum);

function extrapolateValue(input) {
    const values = [input.split(' ').map(val => +val)];
    let nextVal = [];

    while (!noDiff(last(values))) {
        let nextVal = [];
        let val = Array.from(last(values));
        for (let i = 1; i < val.length; i++) {
            nextVal.push(val[i] - val[i - 1]);
        }

        values.push(Array.from(nextVal));
    }

    for (let i = values.length - 2; i >= 0; i--) {
        values[i].unshift(values[i][0] - values[i + 1][0]);
    }
    return values[0][0];
}

function noDiff(arr) {
    for (const item of arr) {
        if (item !== 0) {
            return false;
        }
    }

    return true;
}

function last(arr) {
    return arr[arr.length - 1];
}

