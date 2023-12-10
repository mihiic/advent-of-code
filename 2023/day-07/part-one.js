const fs = require('node:fs');

const inputs = fs.readFileSync('./inputs.txt').toString().split('\n').filter(s => s.length);

const strengths = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const ranks = [];

let hands = inputs
    .map(item => item.split(' '))
    .map(item => { 
        return { 
            cards: item[0], 
            bid: +item[1], 
            ranks: getRank(item[0]) 
        } 
    });

hands = hands.sort((a, b) => {
    if (a.ranks.strength !== b.ranks.strength) {
        return a.ranks.strength - b.ranks.strength;
    }

    for (let i = 0; i < 5; i++) {
        if (a.ranks.subranks[i] !== b.ranks.subranks[i]) {
            return a.ranks.subranks[i] - b.ranks.subranks[i];
        }
    }

    return 0;
});
let sum = 0;
for (let i = 0; i < hands.length; i++) {
    sum += (i + 1) * hands[i].bid;
}
// console.log(JSON.stringify(hands, null, 2));
console.log(hands.map(hand => `${hand.cards} - ${hand.bid} `));
console.log('total sum: ', sum);

function getRank(input) {
    const parts = input.split(' ').map(i => i.trim()).filter(l => l.length);

    const subranks = [];
    for (let item of input) {
        subranks.push(strengths.indexOf(item));
    }
    
    

    return {
        strength: getStrength(input),
        subranks: subranks
    }
}

function getStrength(input) {
    const map = {};
    for (const item of input) {
        if (map[item]) {
            map[item]++;
            continue;
        }
        map[item] = 1;
    }

    const keys = Object.keys(map);
    // five of a kind 
    if (keys.length === 1) {
        return 7;
    }

    // high card
    if (keys.length === 5) {
        return 1;
    }

    // pair
    if (keys.length === 4) {
        return 2;
    }

    // two pair or three of a kind
    if (keys.length === 3) {
        for (const key of keys) {
            if (map[key] === 3) {
                return 4;
            }
        }
        return 3;
    }

    if (keys.length === 2) {
        console.log('2 keys', input);
        for (const key of keys) {           
            if (map[key] === 4) {
                return 6; // four of a kind
            }
        }
        return 5;   // full house
    }
}

