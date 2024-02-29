<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <div class="instructions-container">
      <h2>Instructions</h2>
      <p v-for="(instruction) in instructions" :key="instruction.step">
        {{ instruction.step }}. {{ instruction.text }}
      </p>
    </div>
    <div class="button-container">
      <v-btn @click="generateTeams" width="200">Generate Teams</v-btn>
      <v-btn @click="startSimulation" :disabled="isSimulationFinished" width="200">Start Simulation</v-btn>
    </div>
    <div v-if="isLoading">
      <p>Teams are loading ...</p>
    </div>
    <div v-if="!isLoading && !isSimulationFinished" class="teams-container">
      <Team :team="teamA" teamName="Team A" />
      <p>V/S</p>
      <Team :team="teamB" teamName="Team B" />
    </div>
    <Dashboard v-if="isSimulationFinished && !isLoading" :winner="winnerTeam"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useGlobalStore } from '@/stores/globalStore'
import { useBattleStore } from '@/stores/battleStore'
import Dashboard from './Dashboard.vue'
import Team from './teams/Team.vue'

@Options({
  components: {
    Dashboard,
    Team
  },
  props: {
    msg: String
  }
})
export default class Home extends Vue {
  msg!: string

  public instructions = [
    {
      step: 1,
      text: 'Generate teams by clicking on the "Generate Teams" button.'
    },
    {
      step: 2,
      text: 'Click "Start simulation" to simulate the battle.'
    }
  ]

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

  get winnerTeam () {
    if (!this.teamAIsAlive && this.teamBIsAlive) {
      return 'Team B'
    } else if (!this.teamBIsAlive && this.teamAIsAlive) {
      return 'Team A'
    }
  }

  get isSimulationFinished () {
    return !this.teamAIsAlive || !this.teamBIsAlive
  }

  get battleLog () {
    return this.battleStore.battleLog
  }

  created () {
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

<style scoped>
h2 {
  margin: 20px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

.instructions-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.button-container .v-btn:not(:first-child) {
  margin-left: 10px;
}

.teams-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
