const { expect } = require('chai');
const Player = require('../src/Player');

describe('Player', () => {
    it('should initialize with correct attributes', () => {
        const player = new Player(50, 5, 10);
        expect(player.getHealth()).to.equal(50);
        expect(player.getStrength()).to.equal(5);
        expect(player.getAttack()).to.equal(10);
    });

    it('should reduce health correctly', () => {
        const player = new Player(50, 5, 10);
        player.reduceHealth(20);
        expect(player.getHealth()).to.equal(30);
    });

    it('should not reduce health below 0', () => {
        const player = new Player(50, 5, 10);
        player.reduceHealth(60);
        expect(player.getHealth()).to.equal(0);
    });

    it('should correctly identify if alive', () => {
        const player = new Player(50, 5, 10);
        expect(player.isAlive()).to.be.true;
        player.reduceHealth(50);
        expect(player.isAlive()).to.be.false;
    });
});
