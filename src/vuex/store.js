import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const defaultState = {
  page: {
    author: null,
    date: null,
    date_gmt: null,
    excerpt: null,
    featured_media: null,
    guid: null,
    link: null,
    slug: null,
    title: null,
    content: null
  },
  posts: [{
    title: null,
    content: null
  }],
  post: {
    title: null,
    content: null
  },
  category: {
    id: null,
    name: null,
    slug: null
  }
}

const inBrowser = typeof window !== 'undefined'

// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

const mutations = {
  PAGE: (state, page) => {
    state.page = page
  },
  POSTS: (state, posts) => {
    state.posts = posts
  },
  POST: (state, post) => {
    state.post = post
  },
  CATEGORY: (state, category) => {
    state.category = category
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
