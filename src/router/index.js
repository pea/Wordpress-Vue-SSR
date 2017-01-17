import Vue from 'vue'
import Index from '../components/Index.vue'
import Post from '../components/Post.vue'
import Page from '../components/Page.vue'
import Archive from '../components/Archive.vue'
import Category from '../components/Category.vue'
import PageNotFound from '../components/PageNotFound.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Index },
    { path: '/page/:slug', component: Page },
    { path: '/post/:slug', component: Post },
    { path: '/category/:slug', component: Category },
    // { path: 'tag', component: Tag },
    // { path: 'taxonomy', component: Taxonomy },
    // { path: 'author', component: Author },
    { path: '/archive', component: Archive },
    // { path: 'search', component: Search },
    // { path: 'attachment', component: Attachment }
    { path: '/404', component: PageNotFound }

  ]
})

export default router
