<template>
  <div class="header">
    <h1>Oden Technologies</h1>
    <Button v-for="(chart, key) in charts" :title="chart.title" :key="key" />
  </div>
</template>

<script>
import Button from './Button.vue'
import config from '@/config/config'

export default {
  name: 'Header',
  components: {
    Button
  },
  data () {
    return {
      charts: config.dataTypes
    }
  }
}
</script>

<style scoped>

</style>
