const fs = require('node:fs');
const { execSync } = require('child_process');

const inputs = fs.readFileSync('./inputs.txt')
    .toString()
    .split('\n')
    .map(line => line.trim())
    .map(line => line.split(''))
    .filter(line => line.length);

const map = [];
for (let input of inputs) {
    map.push([]);
    for (let c of input) {
        map[map.length - 1].push(0)
    }
}
mapStart();

function mapStart() {
    for (let i = 0; i < inputs.length; i++) {
        for (let j = 0; j < inputs[0].length; j++) {
            if (inputs[i][j] === 'S') {
                map[i][j] = 1;
                return;
            }
        }
    }
}

start(1);
let map2 = [];
resizeMap();

function resizeMap() {
    for (let i = 0; i < inputs.length; i++) {
       map2.push(Array(inputs[0].length * 3).fill(0)); 
       map2.push(Array(inputs[0].length * 3).fill(0)); 
       map2.push(Array(inputs[0].length * 3).fill(0)); 
    }

    for (let i = 0; i < inputs.length; i++) {
        for (let j = 0; j < inputs[0].length; j++) {
            if (map[i][j] !== 0) {
                const part = symbolToMap(inputs[i][j]);
                for (let x = 0; x < 3; x++) {
                    for (let y = 0; y < 3; y++) {
                        map2[i*3 + x][j*3 + y] = part[x][y];
                    }
                }
            }
        }
    }
    floodFill2(0, 0);
    let count = 0;
    for (let i = 1; i < map2.length; i+= 3) {
        let str = '';
        for (let j = 1; j < map2[0].length; j += 3) {
            if (map2[i][j] === 0) {
                count += 1;
            }
        }
    }
    console.log('nest size is: ', count);
}

function floodFill2(i, j) {
    if (map2[i]?.[j] === 0) {
        map2[i][j] = 2;
        floodFill2(i + 1, j);
        floodFill2(i, j + 1);
        floodFill2(i - 1, j);
        floodFill2(i, j - 1);
    }

}

function symbolToMap(symbol) {
    switch (symbol) {
        case '|':
            return [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
        case '-':
            return [[0, 0, 0], [1, 1, 1], [0, 0, 0]];
        case 'F':
            return [[0, 0, 0], [0, 1, 1], [0, 1, 0]];
        case 'L':
            return [[0, 1, 0], [0, 1, 1], [0, 0, 0]];
        case 'J':
            return [[0, 1, 0], [1, 1, 0], [0, 0, 0]];
        case '7':
            return [[0, 0, 0], [1, 1, 0], [0, 1, 0]];
        case 'S':
            return [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
        default:
            return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }
}


async function start(current) {
    let matched = false;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === current) {
                floodFill(i, j);
                matched = true;
            }
        }
    }

    if (!matched) {
        // -2 because in this iteration there is no pipe, and another -1 because im counting from 1 instead of 0
        return;
    }
    start(current + 1);
}


function drawMap() {
    for (let i = 0; i < inputs.length; i++) {
        let str = '';
        for (let j = 0; j < inputs[0].length; j++) {
            if (map[i][j] !== 0) {
                str += `${getSymbol(inputs[i][j])}`;
            } else {
                str += '.';
            }
        }
        console.log(str);
    }
}

function getSymbol(str) {
    switch (str) {
        case 'S':
            return 'S';
        case '-':
            return '═';
        case '|':
            return '║';
        case 'F':
            return '╔';
        case 'L':
            return '╚';
        case 'J':
            return '╝';
        case '7':
            return '╗';
    }
}

function floodFill(i, j) {
    const left = [i, j - 1];
    const right = [i, j + 1];
    const up = [i - 1, j];
    const down = [i + 1, j];

    let current = map[i][j];
    const items = [left, right, up, down];
    for (const item of items) {
        if (connected(i, j, item[0], item[1])) {
            if (map[item[0]][item[1]] !== 0) {
                continue;
            }
            map[item[0]][item[1]] = current + 1;
        }
    }
}

function connected(i, j, x, y) {
    const a = inputs[i]?.[j];
    const b = inputs[x]?.[y];

    if (!a || !b) {
        return false;
    }

    if (y > j) { // right
        if (a === '|' || a === 'J' || a === '7') {
            return false;
        }
        return b === '-' || b === 'J' || b === '7';
    }

    if (y < j) { // left 
        if (a === '|' || a === 'F' || a === 'L') {
            return false;
        }
        return b === '-' || b === 'F' || b === 'L';
    }

    if (x > i) { // down
        if (a === 'L' || a === '-' || a === 'J') {
            return false;
        }
        return b === '|' || b === 'L' || b === 'J';
    }

    if (x < i) { // up
        if (a === '-' || a === '7' || a === 'F') {
            return false;
        }
        return b === '|' || b === 'F' || b === '7';
    }
}
