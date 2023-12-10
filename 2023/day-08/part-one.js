const fs = require('node:fs');

const inputs = fs.readFileSync('./inputs.txt').toString().split('\n').filter(s => s.length);
const map = {};

const commands = inputs[0];
const currentNodes = [];
for (let i = 1; i < inputs.length; i++) {
    let parts = inputs[i].split(' = ');
    const lr = parts[1].slice(1, -1).split(', ');

    map[parts[0]] = {
        L: lr[0],
        R: lr[1]
    }

    if (parts[0] === 'AAA') {
        currentNodes.push(parts[0]);
    }
}

let indexes = currentNodes.map(n => 0);
let step = 0;
while (!finalNodes()) {
    for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[i];
        if (node === 'ZZZ') {
            continue;
        }

        const command = commands[step % commands.length];
        currentNodes[i] = map[currentNodes[i]][command];

        if (currentNodes[i] === 'ZZZ') {
            indexes[i] = step + 1;
        }
    }
    
    step++;
}

function finalNodes() {
    for (let node of currentNodes) {
        if (node !== 'ZZZ') {
            return false;
        }
    }

    return true;
}

indexes.sort((a, b) => b - a);

const primes = [2];
for (let i = 2; i < indexes[0] / 2 + 1; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
        if (i % j === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        primes.push(i);
    }
}

let maxPrimes = {};
for (let i = 0; i < indexes.length; i++) {
    let primeMap = {};
    let num = indexes[i];

    while (num !== 1) {
        for (let prime of primes) {
            if (num % prime === 0) {
                num /= prime;
                if (primeMap[prime]) {
                    primeMap[prime] += 1;
                    continue;
                }

                primeMap[prime] = 1;
            }
        }
    }
    for (let primeNum in primeMap) {
        if (!maxPrimes[primeNum]) {
            maxPrimes[primeNum] = primeMap[primeNum];
            continue;
        }

        if (maxPrimes[primeNum] < primeMap[primeNum]) {
            maxPrimes[primeNum] = primeMap[primeNum];
        }
    }
}

let lcm = 1;
for (let prime in maxPrimes) {
    let num = prime;
    let pow = maxPrimes[prime];
    lcm *= Math.pow(num, pow);
}

console.log(lcm);


