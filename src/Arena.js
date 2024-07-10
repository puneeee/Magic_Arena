const Player = require('./Player');

class Arena {
    constructor(playerA, playerB) {
        this.playerA = playerA;
        this.playerB = playerB;
    }

    fight() {
        while (this.playerA.isAlive() && this.playerB.isAlive()) {
            if (this.playerA.getHealth() < this.playerB.getHealth()) {
                this.attack(this.playerA, this.playerB);
            } else {
                this.attack(this.playerB, this.playerA);
            }
            if (!this.playerB.isAlive()) {
                console.log('Player B died.');
                break;
            }
            if (!this.playerA.isAlive()) {
                console.log('Player A died.');
                break;
            }
        }
    }

    attack(attacker, defender) {
        const attackRoll = this.rollDice();
        const defendRoll = this.rollDice();
        const attackDamage = attacker.getAttack() * attackRoll;
        const defendStrength = defender.getStrength() * defendRoll;
        const damage = attackDamage - defendStrength;
        if (damage > 0) {
            defender.reduceHealth(damage);
        }
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }
}

module.exports = Arena;
