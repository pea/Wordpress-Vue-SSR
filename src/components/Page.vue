<template>
  <div>
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
        (response) => { console.log('success'); return resolve(response) },
        (response) => { console.log('fail'); return reject(response) }
      )
  })
}
export default {
  prefetch: fetchInitialData,
  computed: {
    ...mapGetters({
      page: 'getPage'
    })
  },
  mounted () {
    return fetchInitialData(this.$store, this.$route.params)
      .then(response => { })
      .catch(err => {
        if (err) this.$router.push('/404')
      })
  },
  watch: {
    '$route' (to, from) {
      return fetchInitialData(this.$store, this.$route.params)
        .then(response => {})
        .catch(err => {
          if (err) this.$router.push('/404')
        })
    }
  }
}
</script>