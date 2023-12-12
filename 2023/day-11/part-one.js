const fs = require("node:fs");

const inputs = fs.readFileSync('./inputs.txt')
    .toString()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length);

let cols = Array(inputs[0].length).fill(1);
let rows = Array(inputs.length).fill(1);
const galaxies = [];
let galaxyIterator = 1;
for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[0].length; j++) {
        if (inputs[i][j] === '#') {
            galaxies.push({
                x: j,
                y: i,
                id: galaxyIterator
            });
            cols[j] = 0;
            rows[i] = 0;
            galaxyIterator++;
        }
    }
}

calculateDistances();

function calculateDistances() {
    let totalDistance = 0;
    let pair = 1;
    for (let ag of galaxies) {
        for (let bg of galaxies) {
            if (ag.id >= bg.id) {
                continue;
            }

            const a = getExpandedCoordinates(ag);
            const b = getExpandedCoordinates(bg);
            const dist = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
            pair++;
            totalDistance += dist;
        }
    }

    console.log('Total distance between galaxies: ', totalDistance);
}

function getExpandedCoordinates(galaxy) {
    const expandedCols = cols.slice(0, galaxy.x).filter(e => !!e);
    const expandedRows = rows.slice(0, galaxy.y).filter(e => !!e);
    const contractedCols = galaxy.x - expandedCols.length;
    const contractedRows = galaxy.y - expandedRows.length;

    return {
        x: expandedCols.length * 2 + contractedCols,
        y: expandedRows.length * 2 + contractedRows
    }
}
