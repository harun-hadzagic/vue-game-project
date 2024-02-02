function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) return { width: "0%" };
      else return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) return { width: "0%" };
      else return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const randomValue = getRandomValue(5, 12);
      this.monsterHealth -= randomValue;
      this.addLogMessage("player", "attack", randomValue)
      this.attackPlayer();
    },
    attackPlayer() {
      const randomValue = getRandomValue(8, 15);
      this.addLogMessage("monster", "attack", randomValue)
      this.playerHealth -= randomValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const randomValue = getRandomValue(10, 25);
      this.addLogMessage("player", "attack", randomValue)
      this.monsterHealth -= randomValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      this.addLogMessage("player", "heal", healValue)
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
    startNewGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(actionBy, actionType, actionValue) {
      this.logMessages.unshift({ actionBy, actionType, actionValue });
    },
  },
});

app.mount("#game");
