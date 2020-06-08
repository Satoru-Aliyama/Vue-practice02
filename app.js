new Vue({
    el:'#app',
    
    data: {
        heroHealth: 100,
        monsterHealth: 100,
        isRunning: false,
        turns:[],
    },
    
    methods: {
        gameStart() {
            this.isRunning = !this.isRunning;
            this.heroHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack() {
            let damage = this.caluculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isHero: true,
                text: `Hero damaged Monster by ${damage} points`,
            })
            if(this.checkWin()) {
                return;
            }
            this.monsterAttacks(5, 12);
        
        },
        specialAttack() {
            let damage =  this.caluculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isHero: true,
                text: `Hero damaged Monster by ${damage} points`,
            })
            if(this.checkWin()) {
                return;
            }
            this.monsterAttacks(12, 24);
        },
        heal() {
            if(this.heroHealth <= 85) {
                this.heroHealth += 15;
            } else {
                this.heroHealth = 100;
            }
            this.turns.unshift({
                isHero: true,
                text: `Hero heals for 10 points`,
            })
            this.monsterAttacks(3, 10);
        },
        givUp() {
            this.isRunning = !this.isRunning;
        },
        caluculateDamage(min, max) {
            return  Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttacks(min, max) {
            let damage = this.caluculateDamage(min, max)
            this.heroHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isHero: false,
                text: `Monster damaged Hero by ${damage} points`,
            })
        },
        checkWin() {
            if(this.monsterHealth <= 0) {
                if(confirm('You win! New Game?')) {
                    this.gameStart();
                }else {
                    this.isRunning = false;
                }
                return true;
            } else if(this.heroHealth <= 0) {
                if(confirm('You lost! New Game?')) {
                    this.gameStart();
                }else {
                    this.isRunning = false;
                }
                return true
            }
            return false
        },
    }
})