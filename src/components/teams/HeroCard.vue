<template>
  <div>
    <div @click="flipped = !flipped">
      <div class="hero-card" :class="{ flipped: flipped }">
        <div class="front">
          <!-- Contenido visible cuando la tarjeta no está volteada -->
          <h3>{{ hero.name }}</h3>
          <p>HP: {{ hero.hp }}</p>
          <ul>
            <li v-for="(value, key) in hero.attacks" :key="key">
              {{ key.charAt(0).toUpperCase() + key.slice(1) }}: {{ value }}
            </li>
          </ul>
        </div>
        <div class="back">
          <!-- Contenido visible cuando la tarjeta está volteada -->
          <p>Stats:</p>
          <ul>
            <li v-for="(value, key) in hero.powerstats" :key="key">
              {{ key.charAt(0).toUpperCase() + key.slice(1) }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    hero: Object
  }
})
export default class HeroCard extends Vue {
  flipped = false
}
</script>

<style scoped>
h3 {
  font-size: 14px;
  padding-right: 3px;
  padding-left: 3px;
}
p {
  font-size: 14px;
}
ul {
  list-style-type: none;
  padding: 0;
  font-size: 12px;
}

.hero-card {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  margin: 10px;
  width: 120px;
  height: 150px;
  padding-top: 10px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.flipped {
  transform: rotateY(180deg);
}

.front, .back {
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
}

.back {
  transform: rotateY(180deg);
}

</style>
