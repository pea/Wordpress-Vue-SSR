<template>
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
</template>

<script>
import { mapGetters } from 'vuex'
const fetchInitialData = (store, params) => {
  return store.dispatch(`getCategory`, params.slug)
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
      category: 'getCategory'
    })
  },
  mounted () {
    fetchInitialData(this.$store, this.$route.params)
    .then(() => {
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