import { defineStore } from 'pinia'
import { fetchSuperheroById } from '@/services/api/superheroesApi'
import { FormattedSuperHero, Team } from '@/types/globalTypes'
import { validateStats } from '@/utils/validations'
import { STATS_TYPES, TEAMS } from '@/utils/constants'
import { calculateHP, determineTeamAlignment, getRandomInt } from '@/utils/utils'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    teamA: {} as Team,
    teamB: {} as Team,
    loading: false,
    error: null as Error | null
  }),
  actions: {
    // Create 5 unique and valid heroes for each team and prepare each team
    async createTeams () {
      this.loading = true
      this.error = null
      this.teamA = { heros: [], teamAlignment: '' }
      this.teamB = { heros: [], teamAlignment: '' }
      const uniqueIds = new Set<number>()

      while (this.teamA.heros.length < 5 || this.teamB.heros.length < 5) {
        const superhero = await this.getValidSuperhero(uniqueIds)
        if (superhero) {
          if (this.teamA.heros.length < 5) {
            this.teamA.heros.push(superhero)
          } else if (this.teamB.heros.length < 5) {
            this.teamB.heros.push(superhero)
          }
        }
      }

      for (const teamKey of Object.values(TEAMS)) {
        await this.prepareTeam(teamKey)
      }

      this.loading = false
    },

    // Get a superhero from the API and return it formatted if it's valid
    async getValidSuperhero (uniqueIds: Set<number>, maxAttempts = 100) {
      let formattedSuperHero: FormattedSuperHero | null = null
      for (let attempt = 0; attempt < maxAttempts && !formattedSuperHero && uniqueIds.size < 731; attempt++) {
        const id = Math.floor(Math.random() * 731) + 1
        if (!uniqueIds.has(id)) {
          const { ok, hero } = await fetchSuperheroById(id)
          if (ok && validateStats(hero)) {
            formattedSuperHero = {
              name: hero.name,
              hp: 0,
              alignment: hero.biography.alignment,
              powerstats: {
                intelligence: hero.powerstats.intelligence,
                strength: hero.powerstats.strength,
                speed: hero.powerstats.speed,
                durability: hero.powerstats.durability,
                power: hero.powerstats.power,
                combat: hero.powerstats.combat
              },
              attacks: {
                mental: 0,
                strong: 0,
                fast: 0
              }
            }
            uniqueIds.add(id)
          }
        }
      }
      return formattedSuperHero
    },

    // Prepare a team by determining its alignment and adding real stats to each hero
    async prepareTeam (teamKey: TEAMS) {
      const team = this[teamKey]
      team.teamAlignment = await determineTeamAlignment(team)

      team.heros = await Promise.all(team.heros.map(async (hero) => {
        return this.addRealStats(hero, team.teamAlignment)
      }))
    },

    // Add real stats to a hero and calculate its HP
    async addRealStats (superhero: FormattedSuperHero, teamAlignment: string, stats = STATS_TYPES) {
      const FB = teamAlignment === superhero.alignment ? 1 + getRandomInt(0, 9) : 1 / (1 + getRandomInt(0, 9))
      for (const stat of stats) {
        const AS = getRandomInt(0, 10)
        const newStat = Math.floor(((2 * parseInt(superhero.powerstats[stat]) + AS) / 1.1) * FB)
        superhero.powerstats[stat] = newStat
      }
      superhero.attacks = {
        mental: Math.floor((superhero.powerstats.intelligence * 0.7 + superhero.powerstats.speed * 0.2 + superhero.powerstats.combat * 0.1) * FB),
        strong: Math.floor((superhero.powerstats.strength * 0.6 + superhero.powerstats.power * 0.2 + superhero.powerstats.combat * 0.2) * FB),
        fast: Math.floor((superhero.powerstats.speed * 0.55 + superhero.powerstats.durability * 0.25 + superhero.powerstats.strength * 0.2) * FB)
      }
      superhero.hp = await calculateHP(superhero)
      return superhero
    }
  }
})
