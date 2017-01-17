import Vue from 'vue'
import store from 'src/vuex/store'
import router from 'src/router/index'

describe('Page.vue', () => {
  it('should render page correctly', done => {
    // Create new Vue instance
    const vm = new Vue({
      el: document.createElement('div'),
      router: router,
      store: store,
      render: h => h('router-view')
    })
    // Change current route
    router.push('/page/sample-page')
    // Run fetchInitialData() inside the component to query API and hydrate store
    Promise.all(router.getMatchedComponents().map(component => {
      if (component.prefetch) {
        return component.prefetch(store, router.history.current.params)
      }
    })).then(() => {
      context.initialState = store.state
      // Run the test when everything's done
      Vue.nextTick(() => {
        // console.log('html:', vm.$el)
        expect(vm.$el.querySelector('h1').textContent).to.equal('Sample Page')
        done()
      })
    })
  })
})
