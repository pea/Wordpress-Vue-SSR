<template>
  <div v-if="dataReady">
      <h1>{{ post.title }}</h1>
      <div v-html="post.content">{{ post.content }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const fetchInitialData = (store, params) => {
  return new Promise((resolve, reject) => {
    return store.dispatch('getPost', params.slug)
      .then(
        response => { return resolve(response) },
        response => { return reject(response) }
      )
  })
}
export default {
  prefetch: fetchInitialData,
  data () {
    return {
      dataReady: false
    }
  },
  computed: {
    ...mapGetters({
      post: 'getPost'
    })
  },
  mounted () {
    return fetchInitialData(this.$store, this.$route.params)
      .then(response => {
        this.dataReady = true
      })
      .catch(err => {
        if (err) this.$router.push({name: 'pagenotfound'})
      })
  },
  watch: {
    $route (to, from) {
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