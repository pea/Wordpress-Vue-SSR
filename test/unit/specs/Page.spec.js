import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'src/vuex/store'
import Page from 'src/components/Page'

describe('Page.vue', () => {
  it('should render page correctly', done => {
    Vue.use(VueRouter)
    // Create new router
    const router = new VueRouter({routes: [
        { path: '/page/:slug', component: Page }
    ]})
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
