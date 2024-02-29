<template>
  <div class="data-table">
    <h3>{{ title }}</h3>
    <v-table
      density="compact"
      height="400"
    >
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.value" class="text-center">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          :key="item.turn"
        >
          <td>{{ item.turn }}</td>
          <td>{{ item.attacker }}</td>
          <td>{{ item.defender }}</td>
          <td>{{ item.attackType }}</td>
          <td>{{ item.damage }}</td>
          <td>{{ item.remainingHp }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    title: String,
    data: Array,
    headers: Array
  }
})
export default class BaseTable extends Vue {
  get parsedData () {
    return this.data
  }
}
</script>

<style scoped>

h3 {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.data-table {
  margin-top: 20px;
  width: 80%;
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

</style>
