<template>
  <button 
    :class="activeClass" 
    @click='setItem(title)'>{{ title }}</button>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Button',
  props: {
    title: String
  },
  computed: {
    activeClass: function () {
      return {
        active: this.currentActiveChart == this.title
      }
    },
    ...mapGetters([
      'currentActiveChart'
    ])
  },
  methods: {
    ...mapActions([
      'setItem'
    ])
  }
}
</script>

<style scoped>
button{
  border-radius: 5px;
  padding: 1em 2em;
  margin: 1em;
  background: #fff;
  border: 1px solid #4bf442;
  color: #4bf442;
  transition: background-color 0.5s ease;
  font-size: 1em;
  font-wieght: bold;
  cursor: pointer;
}

button:focus {outline:0;}

.active{
  color: #fff;
  background: #4bf442;
}
</style>
