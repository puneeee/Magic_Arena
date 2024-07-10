const { expect } = require('chai');
const sinon = require('sinon');
const Player = require('../src/Player');
const Arena = require('../src/Arena');

describe('Arena', () => {
    it('should run a fight until one player dies', () => {
        const playerA = new Player(50, 5, 10);
        const playerB = new Player(100, 10, 5);

        const arena = new Arena(playerA, playerB);
        arena.fight();

        expect(playerA.getHealth() === 0 || playerB.getHealth() === 0).to.be.true;
    });

    it('should attack correctly', () => {
        const playerA = new Player(50, 5, 10);
        const playerB = new Player(100, 10, 5);

        const arena = new Arena(playerA, playerB);
        const rollDiceStub = sinon.stub(arena, 'rollDice');
        
        // Attack roll: 5, Defend roll: 2
        rollDiceStub.onCall(0).returns(5);
        rollDiceStub.onCall(1).returns(2);
        
        arena.attack(playerA, playerB);
        
        expect(playerB.getHealth()).to.equal(70); 
        rollDiceStub.restore();
    });

    it('should not reduce health if defense is greater than attack', () => {
        const playerA = new Player(50, 5, 10);
        const playerB = new Player(100, 10, 5);

        const arena = new Arena(playerA, playerB);
        const rollDiceStub = sinon.stub(arena, 'rollDice');
        
        
        rollDiceStub.onCall(0).returns(1);
        rollDiceStub.onCall(1).returns(6);
        
        arena.attack(playerA, playerB);
        
        expect(playerB.getHealth()).to.equal(100); 
        rollDiceStub.restore();
    });

    it('should use the lower health player to attack first', () => {
        const playerA = new Player(50, 5, 10);
        const playerB = new Player(40, 10, 5);

        const arena = new Arena(playerA, playerB);
        const attackSpy = sinon.spy(arena, 'attack');
        
        arena.fight();
        
        expect(attackSpy.firstCall.args[0]).to.equal(playerB); 
        attackSpy.restore();
    });
});
