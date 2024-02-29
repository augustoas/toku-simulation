<template>
  <div>
    <h2>{{ teamName }}</h2>
    <div class="hero-cards-container">
      <div v-for="(hero, index) in team?.heros" :key="index">
        <HeroCard :hero="hero" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HeroCard from './HeroCard.vue'

@Options({
  components: {
    HeroCard
  },
  props: {
    team: Object,
    teamName: String
  }
})
export default class Team extends Vue {}
</script>

<style scoped>
h2 {
  margin: 20px 0 0;
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
</style>
