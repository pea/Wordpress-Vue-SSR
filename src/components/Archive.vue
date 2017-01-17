<template>
  <div>
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
</template>

<script>
import { mapGetters } from 'vuex'
const fetchInitialData = store => {
  return store.dispatch(`getPosts`)
}
export default {
  prefetch: fetchInitialData,
  computed: {
    ...mapGetters({
      posts: 'getPosts'
    })
  },
  mounted () {
    fetchInitialData(this.$store)
  }
}
</script>