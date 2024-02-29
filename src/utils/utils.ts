import { FormattedSuperHero, Team } from '@/types/globalTypes'
import { ALIGNMENT_TYPES } from '@/utils/constants'

export function calculateHP (superhero: FormattedSuperHero) {
  const AS = Math.floor(Math.random() * 11)
  const hp = Math.floor(
    (superhero.powerstats.strength * 0.8 +
      superhero.powerstats.durability * 0.7 +
      superhero.powerstats.power) / 2 *
    (1 + AS / 10)
  ) + 100
  return hp
}

export function determineTeamAlignment (team: Team) {
  const alignmentCount = team.heros.reduce((acc, hero) => {
    acc[hero.alignment] = (acc[hero.alignment] || 0) + 1
    return acc
  }, {})

  if (alignmentCount[ALIGNMENT_TYPES.GOOD] === alignmentCount[ALIGNMENT_TYPES.BAD]) {
    return ALIGNMENT_TYPES.NEUTRAL
  }

  return alignmentCount[ALIGNMENT_TYPES.GOOD] > (alignmentCount[ALIGNMENT_TYPES.BAD] || 0)
    ? ALIGNMENT_TYPES.GOOD
    : ALIGNMENT_TYPES.BAD
}

export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
