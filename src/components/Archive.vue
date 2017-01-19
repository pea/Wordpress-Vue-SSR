<template>
  <div>
    <div v-if="!dataReady">
      Loading
    </div>
    <div v-if="dataReady">
      <h1>Archive</h1>
      Total: {{ posts.total }}<br>
      Total Pages: {{ posts.totalPages }}
      <ul>
        <li v-for="post in posts.data">
          <router-link :to="{ path: `post/${post.slug}` }">
            {{ post.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import router from '../router/index'

const fetchInitialData = store => {
  return new Promise((resolve, reject) => {
    return store.dispatch(`getPosts`)
    .then(
      response => { return resolve(response) },
      response => { return reject(response) }
    )
  })
  .catch(() => { router.push({name: 'pagenotfound'}) })
}
export default {
  prefetch: fetchInitialData,
  data () {
    return {
      dataReady: typeof window === 'undefined'
    }
  },
  computed: {
    ...mapGetters({
      posts: 'getPosts'
    })
  },
  created () {
    fetchInitialData(this.$store)
    .then(() => {
      this.dataReady = true
    })
    .catch(err => {
      if (err) this.$router.push({name: 'pagenotfound'})
    })
  }
}
</script>