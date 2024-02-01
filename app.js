function getRandomValue(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
        }
    },
    computed: {
        monsterBarStyles(){
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            return {width: this.playerHealth + '%'}
        }
    },
    methods:{
        attackMonster(){
            this.monsterHealth -= getRandomValue(5, 12)
            this.attackPlayer()
        },
        attackPlayer(){
            this.playerHealth -= getRandomValue(8, 15)
        }
    }
})


app.mount("#game")