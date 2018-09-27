import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		currentActiveChart: "Cable Diameter"
  },
  getters: {
		currentActiveChart: state => state.currentActiveChart
  },
  mutations: {
		toggleActive (state, updatedHighlight) {
      state.currentActiveChart = updatedHighlight
    }
  },
  actions: {
		setItem (context, newHightlight) {
      context.commit('toggleActive', newHightlight)
    }
  }
})
