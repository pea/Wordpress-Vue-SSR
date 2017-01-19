<template>
  <div v-if="dataReady">
    <h1>Wordpress Vue.js Server-Side Redering</h1>
    <div class="grid gut20">
      <div class="col perc20" v-for="post in posts.data">
        <div class="caption">
          <router-link :to="{ path: `post/${post.slug}` }">
            <div class="image" v-bind:style="{ backgroundImage: 'url(' + post.featuredImage + ')' }"></div>
            {{ post.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .image {
    width: 100%;
    padding-bottom: 75%;
    background-size: cover;
  }
  .caption {

  }
</style>

<script>
import { mapGetters } from 'vuex'
const fetchInitialData = store => {
  return store.dispatch(`getPosts`)
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