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
    if (params.slug !== store.state.page.slug) {
      return store.dispatch(`getPage`, params.slug)
      .then(
        response => { return resolve(response) },
        response => { return reject(response) }
      )
    } else {
      resolve(store.state.page)
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
      page: 'getPage'
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