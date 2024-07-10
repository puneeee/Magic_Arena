const Player = require('./Player');
const Arena = require('./Arena');

const playerA = new Player(50, 5, 1);
const playerB = new Player(100, 10, 5);

const arena = new Arena(playerA, playerB);
arena.fight();
