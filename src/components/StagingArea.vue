<template>
  <div class="stageing-area">
    <LineGraph 
      v-for="(chart, key) in charts" 
      :title="chart.title"
      :parameter="chart.parameter" 
      :key="key" 
    />
  </div>
</template>

<script>
import LineGraph from './dataTypes/LineGraph.vue'
import config from '@/config/config'

export default {
  name: 'StagingArea',
  components: {
    LineGraph
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
