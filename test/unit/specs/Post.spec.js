import Vue from 'vue'
import router from 'src/router/index'
import mockStore from '../mocks/store'

describe('Post.vue', () => {
  it('should render post correctly', done => {
    // Create new Vue instance
    const vm = new Vue({
      el: document.createElement('div'),
      router: router,
      store: mockStore,
      render: h => h('router-view')
    })
    // Load component in router view
    router.push('/post/mock')
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
        expect(vm.$el.querySelector('h1').textContent).to.equal('Sample Title')
        expect(vm.$el.textContent).to.contain('Sample content')
        done()
      })
    })
  })
})
