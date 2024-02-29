<template>
  <div class="dashboard-container">
    <h3> {{ winner }} wins.</h3>
    <BaseTable
      :title="'Battle Log'"
      :data="battleLog"
      :headers="attacksTableHeaders"
    />
    <div class="email-section-container">
      <p>Save logs to your email here.</p>
      <v-text-field
        class="email-input"
        label="Email"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-btn @click="sendBattleLogs" :disabled="!isEmailValid" width="200">Send</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useGlobalStore } from '@/stores/globalStore'
import { useBattleStore } from '@/stores/battleStore'
import BaseTable from './base/BaseTable.vue'

@Options({
  components: {
    BaseTable
  },
  props: {
    winner: String
  }
})
export default class Dashboard extends Vue {
  public email = ''
  public emailRules = [
    v => /.+@.+\..+/.test(v) || 'Invalid email'
  ]

  public attacksTableHeaders = [
    { text: 'Turn', value: 'turn' },
    { text: 'Attacker', value: 'attacker' },
    { text: 'Defender', value: 'defender' },
    { text: 'Attack Type', value: 'attackType' },
    { text: 'Damage', value: 'damage' },
    { text: 'Remaining HP', value: 'remainingHp' }
  ]

  get globalStore () {
    return useGlobalStore()
  }

  get battleStore () {
    return useBattleStore()
  }

  get battleLog () {
    return this.battleStore.battleLog
  }

  get isEmailValid () {
    return this.emailRules.every(rule => rule(this.email) === true)
  }

  async sendBattleLogs () {
    console.log('Sending battle logs to:', this.email)
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.email-section-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.email-input {
  width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
