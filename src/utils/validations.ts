import { ApiSuperhero } from '@/types/globalTypes'

export function validateStats (superhero: ApiSuperhero): boolean {
  const stats = superhero.powerstats
  return Object.values(stats).every(stat => {
    if (stat === null) return false
    const numberStat = parseInt(stat)
    return !isNaN(numberStat)
  })
}
