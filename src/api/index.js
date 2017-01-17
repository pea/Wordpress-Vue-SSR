import request from 'axios'

export default {
  baseUrl: 'http://wpvue.peabay.xyz/wp-json/wp/v2/',
  /**
   * Return a single page
   * @param  string slug Page slug (e.g. 'sample-page')
   * @return Promise Filtered response
   */
  getPage (slug) {
    return new Promise((resolve, reject) => {
      request.defaults.baseURL = this.baseUrl
      request.get(`pages?slug=${slug}`).then((response) => {
        const data = [...response.data][0]
        if (response.statusText === 'OK' && response.data.length > 0) {
          const filtered = {
            content: data.content.rendered,
            author: data.author,
            date: data.date,
            date_gmt: data.date_gmt,
            excerpt: data.excerpt.rendered,
            featured_media: data.featured_media,
            guid: data.guid.rendered,
            link: data.link,
            slug: data.slug,
            title: data.title.rendered
          }
          resolve(filtered)
        } else {
          reject(response)
        }
      })
    })
  },
  /**
   * Return a single post
   * @param  string slug Post slug (e.g. 'hello-world')
   * @return Promise Filtered response
   */
  getPost (slug) {
    return new Promise((resolve, reject) => {
      request.defaults.baseURL = this.baseUrl
      request.get(`posts?slug=${slug}`).then((response) => {
        const data = [...response.data][0]
        if (response.statusText === 'OK' && response.data.length > 0) {
          const filtered = {
            content: data.content.rendered,
            author: data.author,
            date: data.date,
            date_gmt: data.date_gmt,
            excerpt: data.excerpt.rendered,
            featured_media: data.featured_media,
            guid: data.guid.rendered,
            link: data.link,
            slug: data.slug,
            title: data.title.rendered
          }
          resolve(filtered)
        } else {
          reject(response)
        }
      })
    })
  },
  /**
   * Return all posts (paginated)
   * @param  string slug Post slug (e.g. 'hello-world')
   * @return Promise Filtered response
   */
  getPosts () {
    return new Promise((resolve, reject) => {
      request.defaults.baseURL = this.baseUrl
      request.get(`posts`).then((response) => {
        const data = [...response.data]
        if (response.statusText === 'OK' && response.data.length > 0) {
          const filtered = {
            total: response.headers['x-wp-total'],
            totalPages: response.headers['x-wp-totalpages'],
            data: data.map(item => ({
              id: item.id,
              title: item.title.rendered,
              content: item.content.rendered,
              slug: item.slug
            }))
          }
          resolve(filtered)
        } else {
          reject(response)
        }
      })
    })
  },
  /**
   * Return all posts in a category (paginated)
   * @param  string slug Category slug (e.g. 'news')
   * @return Promise Filtered response
   */
  getCategory (slug) {
    return new Promise((resolve, reject) => {
      request.defaults.baseURL = this.baseUrl
      return request.get(`categories?slug=${slug}`).then((response) => {
        const data = [...response.data][0]
        if (response.statusText === 'OK' && response.data.length > 0) {
          return {
            id: data.id,
            name: data.name,
            slug: data.slug
          }
        }
      })
      .then((category) => {
        return request.get(`posts?categories=${category.id}`).then((response) => {
          const data = [...response.data]
          if (response.statusText === 'OK' && response.data.length > 0) {
            category.posts = data.map(item => ({
              id: item.id,
              title: item.title.rendered,
              content: item.content.rendered,
              slug: item.slug
            }))
            resolve(category)
          } else {
            reject(response)
          }
        })
      })
    })
  }
}
