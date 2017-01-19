<template>
  <div>
    <div v-if="!dataReady">
      Loading
    </div>
    <div v-if="dataReady">
        <h1>{{ post.title }}</h1>
        <div v-html="post.content">{{ post.content }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import router from '../router/index'

/**
 * fetchInitialData
 * Fetch post data and commit it to the store. Called on the
 * server-side in ../server-entry.js if page loaded directly.
 * Called on the client-side using the activated() hook if
 * this component is loaded.
 * @param  Object store
 * @param  Object params Url parameters
 * @return Promise
 */
const fetchInitialData = (store, params) => {
  return new Promise((resolve, reject) => {
    if (params.slug !== store.state.post.slug) {
      return store.dispatch('getPost', params.slug)
      .then(
        response => { return resolve(response) },
        response => { return reject(response) }
      )
    } else {
      resolve(store.state.post)
    }
  })
  .catch(() => { router.push({name: 'pagenotfound'}) })
}
export default {
  prefetch: fetchInitialData,
  data () {
    return {
      dataReady: typeof window !== 'undefined'
    }
  },
  computed: {
    ...mapGetters({
      post: 'getPost'
    })
  },
  activated () {
    this.dataReady = false
    return fetchInitialData(this.$store, this.$route.params)
    .then(response => {
      this.dataReady = true
    })
    .catch(err => {
      if (err) this.$router.push({name: 'pagenotfound'})
    })
  }
}
</script>