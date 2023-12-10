const fs = require('node:fs');

const inputs = fs.readFileSync('./inputs.txt').toString().split('\n');

const seeds = inputs[0].split(': ')[1].split(' ').map(s => +s);

const tables = [];
let currentMap = -1;
for (let i = 1; i < inputs.length; i++) {
    let line = inputs[i].trim();
    if (!line.length) {
        continue;
    }

    if (line.indexOf('map') > -1) {
        currentMap += 1;
        tables.push([]);
        continue;
    }

    tables[currentMap].push(parseTable(line));
}
let locations = [];
for (let seed of seeds) {
    locations.push(findLocation(seed, tables));
}

console.log('Nearest location to plant a seed is: ', Math.min(...locations));

function findLocation(source) {
    let src = source;
    for (const table of tables) {
       src = getDestination(src, table);
    }
    return src;
}

function getDestination(source, table) {
    for (const range of table) {
        const start = range.src;
        const end = range.src + range.len;
        if (start <= source && source < end) {
            return range.dst + source - range.src;
        }
    }

    return source;
}

function parseTable(input) {
    const [dst, src, len] = input.split(' ').map(s => +s);

    return {
        dst: dst,
        src: src,
        len
    }
}

