import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore'
import { BattleLog } from '@/types/globalTypes'
import { ATTACKS_TYPES, TEAMS } from '@/utils/constants'

export const useBattleStore = defineStore('battle', {
  state: () => ({
    battleLog: [] as BattleLog[],
    isBattleInProgress: false,
    error: null as Error | null
  }),
  actions: {
    async simulateBattle () {
      this.isBattleInProgress = true
      const globalStore = useGlobalStore()

      try {
        let turn = Math.random() < 0.5 ? TEAMS.TEAM_A : TEAMS.TEAM_B
        let turnCounter = 1
        const battleLog: BattleLog[] = []

        while (globalStore.teamA.heros.length > 0 && globalStore.teamB.heros.length > 0) {
          const attackerTeam = turn === TEAMS.TEAM_B ? globalStore.teamB : globalStore.teamA
          const defenderTeam = turn === TEAMS.TEAM_A ? globalStore.teamB : globalStore.teamA

          // Seleccionar héroes y ataques de manera aleatoria
          const attacker = attackerTeam.heros[0] // Simplificación, selecciona el primer héroe
          const defender = defenderTeam.heros[0] // Simplificación, selecciona el primer héroe
          const attackType = ATTACKS_TYPES[Math.floor(Math.random() * 3)]
          const damage = attacker.attacks[attackType]

          // Aplicar daño
          defender.hp -= damage
          battleLog.push({
            turn: turnCounter,
            attacker: attacker.name,
            defender: defender.name,
            attackType,
            damage,
            remainingHp: defender.hp > 0 ? defender.hp : 0
          })

          // Verificar si el defensor ha caído
          if (defender.hp <= 0) {
            defenderTeam.heros.shift() // Eliminar al héroe caído del equipo
          }

          // Alternar turno
          turn = turn === TEAMS.TEAM_A ? TEAMS.TEAM_B : TEAMS.TEAM_A
          turnCounter++
        }

        this.battleLog = battleLog
      } catch (error) {
        this.error = null
      } finally {
        this.isBattleInProgress = false
      }
    }
  }
})
