import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import defaultState from './state'
import mutations from './mutations'

Vue.use(Vuex)

const inBrowser = typeof window !== 'undefined'

// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
