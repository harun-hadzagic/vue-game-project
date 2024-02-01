function getRandomValue(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        }
    },
    computed: {
        monsterBarStyles(){
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0
        }
    },
    methods:{
        attackMonster(){
            this.currentRound++;
            this.monsterHealth -= getRandomValue(5, 12);
            this.attackPlayer();
        },
        attackPlayer(){
            this.playerHealth -= getRandomValue(8, 15)
        },
        specialAttackMonster(){
            this.currentRound++;
            this.monsterHealth -= getRandomValue(10, 25)
            this.attackPlayer()
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8, 20)
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += healValue
            }
            this.attackPlayer();
        }
    }
})


app.mount("#game")