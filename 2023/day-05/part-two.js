const fs = require('node:fs');

const inputs = fs.readFileSync('./inputs.txt').toString().split('\n');

const seedInputs = groupArray(inputs[0].split(': ')[1].split(' ').map(s => +s), 2);

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

let currentMin = Infinity;

for (const input of seedInputs) {
    console.log('next seed input', currentMin);
    for (let i = input[0]; i < input[0] + input[1]; i++) {
        let loc = findLocation(i, tables);
        if (loc < currentMin) {
            currentMin = loc;
        }
    }

}

console.log('Nearest location to plant a seed is: ', Math.min(...locations));


function groupArray(array, groupSize) {
  var result = [];
  
  for (var i = 0; i < array.length; i += groupSize) {
    result.push(array.slice(i, i + groupSize));
  }
  
  return result;
}

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

