/**
 * State, getters, mutations are live.
 * Actions are mocked
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from 'src/vuex/getters'
import defaultState from 'src/vuex/state'
import mutations from 'src/vuex/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: defaultState,
  mutations,
  getters,
  actions: {
    getPage ({ commit, state }, slug) {
      return new Promise((resolve, reject) => {
        const response = {
          title: 'Sample Title',
          content: '<b>Sample content</b>'
        }
        commit('PAGE', response)
        resolve(response)
      })
    },
    getPost ({ commit, state }, slug) {
      return new Promise((resolve, reject) => {
        const response = {
          title: 'Sample Title',
          content: '<b>Sample content</b>'
        }
        commit('POST', response)
        resolve(response)
      })
    }
  }
})
