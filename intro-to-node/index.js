const superheroes = require('superheroes');
const supervillains = require('supervillains');

const mysuperhero = superheroes.random();
const mysupervillain = supervillains.random();

console.log(mysuperhero + " vs " + mysupervillain);