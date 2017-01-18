import Vue from 'vue'
import Vuex from 'vuex'
import router from 'src/router/index'
import * as getters from 'src/vuex/getters'
import defaultState from 'src/vuex/state'
import mutations from 'src/vuex/mutations'

Vue.use(Vuex)

let mockStore = new Vuex.Store({
  state: defaultState,
  mutations,
  getters,
  actions: {
    getPage ({ commit, state }, slug) {
      return new Promise((resolve, reject) => {
        const response = {
          title: 'Sample Page',
          content: '<b>Content</b>'
        }
        commit('PAGE', response)
        resolve(response)
      })
    }
  }
})

describe('Page.vue', () => {
  it('should render page correctly', done => {
    // Create new Vue instance
    const vm = new Vue({
      el: document.createElement('div'),
      router: router,
      store: mockStore,
      render: h => h('router-view')
    })
    // Change current route
    router.push('/page/sample-page')
    // Run fetchInitialData() inside the component to query API and hydrate store
    Promise.all(router.getMatchedComponents().map(component => {
      if (component.prefetch) {
        return component.prefetch(mockStore, router.history.current.params)
      }
    })).then(() => {
      context.initialState = mockStore.state
      // Run the test when everything's done
      Vue.nextTick(() => {
        // console.log('html:', vm.$el)
        expect(vm.$el.querySelector('h1').textContent).to.equal('Sample Page')
        done()
      })
    })
  })
})
