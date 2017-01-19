<template>
  <div v-if="dataReady">
      <h1>{{ page.title }}</h1>
      <div v-html="page.content">{{ page.content }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const fetchInitialData = (store, params) => {
  return new Promise((resolve, reject) => {
    return store.dispatch(`getPage`, params.slug)
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
      dataReady: typeof window === 'undefined'
    }
  },
  computed: {
    ...mapGetters({
      page: 'getPage'
    })
  },
  created () {
    return fetchInitialData(this.$store, this.$route.params)
    .then(response => {
      this.dataReady = true
    })
    .catch(err => {
      if (err) this.$router.push({name: 'pagenotfound'})
    })
  },
  activated () {
    if (this.$route.params.slug !== this.$store.state.post.slug) {
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