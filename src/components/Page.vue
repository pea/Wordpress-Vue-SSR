<template>
  <div>
    <div v-if="!dataReady">
      Loading
    </div>
    <div v-if="dataReady">
        <h1>{{ page.title }}</h1>
        <div v-html="page.content">{{ page.content }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import router from '../router/index'

const fetchInitialData = (store, params) => {
  return new Promise((resolve, reject) => {
    return store.dispatch(`getPage`, params.slug)
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
    if (this.$route.params.slug !== this.$store.state.page.slug) {
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