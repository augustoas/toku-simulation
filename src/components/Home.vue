<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
    </p>
    <p>{{ count }}</p>
    <button @click="generateTeams">Generate Teams</button>
    <button @click="startSimulation">Simulate</button>
    <div v-if="isLoading">
      <p>Teams are loading ...</p>
    </div>
    <div v-if="!isLoading">
      <h2 v-if="isSimulationFinished">Winners</h2>
      <div class="teams-container">
        <div class="team" v-if="teamAIsAlive">
          <h2>Team A</h2>
          <div class="hero-cards-container">
            <div v-for="(hero, index) in teamA.heros" :key="index" class="hero-card">
              <h3>{{ hero.name }}</h3>
              <p>HP: {{ hero.hp }}</p>
              <p>Attacks:</p>
              <ul>
                <li v-for="(attack, index) in hero.attacks" :key="index">
                  {{ attack }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p v-if="!isSimulationFinished">V/S</p>
        <div class="team" v-if="teamBIsAlive">
          <h2>Team B</h2>
          <div class="hero-cards-container" >
            <div v-for="(hero, index) in teamB.heros" :key="index" class="hero-card">
              <h3>{{ hero.name }}</h3>
              <p>Attacks:</p>
              <ul>
                <li v-for="(attack, index) in hero.attacks" :key="index">
                  {{ attack }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="isSimulationFinished && !isLoading">
      <table>
        <thead>
          <tr>
            <th>Turn</th>
            <th>Attacker</th>
            <th>Defender</th>
            <th>Attack Type</th>
            <th>Damage</th>
            <th>Remaining HP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in battleLog" :key="index">
            <td>{{ log.turn }}</td>
            <td>{{ log.attacker }}</td>
            <td>{{ log.defender }}</td>
            <td>{{ log.attackType }}</td>
            <td>{{ log.damage }}</td>
            <td>{{ log.remainingHp }}</td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useGlobalStore } from '@/stores/globalStore'
import { useBattleStore } from '@/stores/battleStore'

@Options({
  props: {
    msg: String
  }
})
export default class Home extends Vue {
  msg!: string

  get globalStore () {
    return useGlobalStore()
  }

  get battleStore () {
    return useBattleStore()
  }

  get isLoading () {
    return this.globalStore.loading
  }

  get teamA () {
    return this.globalStore.teamA
  }

  get teamAIsAlive () {
    return this.globalStore.teamA.heros.length > 0
  }

  get teamB () {
    return this.globalStore.teamB
  }

  get teamBIsAlive () {
    return this.globalStore.teamB.heros.length > 0
  }

  get isSimulationFinished () {
    return !this.teamAIsAlive || !this.teamBIsAlive
  }

  get battleLog () {
    return this.battleStore.battleLog
  }

  // Opcionalmente, puedes usar los métodos del ciclo de vida para trabajar con el store
  created () {
    console.log('Home mounted')
    try {
      this.globalStore.createTeams()
    } catch (error) {
      console.error('Error during generating teams:', error)
    }
  }

  async generateTeams () {
    try {
      await this.globalStore.createTeams()
    } catch (error) {
      console.error('Error during generating teams:', error)
    }
  }

  async startSimulation () {
    try {
      await this.battleStore.simulateBattle()
    } catch (error) {
      console.error('Error during simulation:', error)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 10px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #462b81;
}

.teams-container {
  display: flex;
  justify-content: space-evenly;
}

.team {
  width: 45%; /* Adjust as needed */
}

.hero-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  background-color: #9fa1b738;
  border-radius: 12px;
  margin-right: 20px;
  margin-left: 20px;
}

.hero-card {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  margin: 10px 20px 10px 20px;
  width: 100px;
  height: 200px;
  padding: 10px;
}

table {
  width: 60%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 15px;
  text-align: left;
}
</style>
