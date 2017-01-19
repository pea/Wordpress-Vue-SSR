<template>
  <div>
    <div v-if="!dataReady">
      Loading
    </div>
    <div v-if="dataReady">
      <h1>{{ category.name }}</h1>
      <ul>
        <li v-for="post in category.posts">
          <router-link :to="{ path: `/post/${post.slug}` }">
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

const fetchInitialData = (store, params) => {
  return new Promise((resolve, reject) => {
    return store.dispatch(`getCategory`, params.slug)
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
      category: 'getCategory'
    })
  },
  created () {
    fetchInitialData(this.$store, this.$route.params)
    .then(() => {
      this.dataReady = true
    })
    .catch(err => {
      console.log(err)
      if (err) this.$router.push({name: 'pagenotfound'})
    })
  },
  activated () {
    if (this.$route.params.slug !== this.$store.state.category.slug) {
      this.dataReady = typeof window === 'undefined'
      return fetchInitialData(this.$store, this.$route.params)
      .then(response => {
        this.dataReady = true
      })
      .catch(err => {
        if (err) this.$router.push({name: 'pagenotfound'})
      })
    }
  }
}
</script>