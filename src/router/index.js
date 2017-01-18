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
    { path: '/', name: 'index', component: Index },
    { path: '/page/:slug', name: 'page', component: Page },
    { path: '/post/:slug', name: 'post', component: Post },
    { path: '/category/:slug', name: 'category', component: Category },
    // { path: 'tag', component: Tag },
    // { path: 'taxonomy', component: Taxonomy },
    // { path: 'author', component: Author },
    { path: '/archive', name: 'achive', component: Archive },
    // { path: 'search', component: Search },
    // { path: 'attachment', component: Attachment }
    { path: '/404', name: 'pagenotfound', component: PageNotFound }

  ]
})

export default router
