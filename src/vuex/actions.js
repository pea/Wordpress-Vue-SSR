import request from 'axios'

request.defaults.baseURL = 'http://wpvue.peabay.xyz/wp-json/wp/v2/'

export const getPage = ({ commit, state }, slug) => {
  return new Promise((resolve, reject) => {
    request.get(`pages?slug=${slug}`).then((response) => {
      if (response.statusText === 'OK' && response.data.length > 0) {
        commit('PAGE', {
          content: response.data[0].content.rendered,
          author: response.data[0].author,
          date: response.data[0].date,
          date_gmt: response.data[0].date_gmt,
          excerpt: response.data[0].excerpt.rendered,
          featured_media: response.data[0].featured_media,
          guid: response.data[0].guid.rendered,
          link: response.data[0].link,
          slug: response.data[0].slug,
          title: response.data[0].title.rendered
        })
        resolve(response)
      } else {
        reject(response)
      }
    })
      .catch((error) => {
        console.log(error)
      })
  })
}

export const getPosts = ({ commit, state }) => {
  return request.get('posts').then((response) => {
    if (response.statusText === 'OK') {
      commit('POSTS', {
        total: response.headers['x-wp-total'],
        totalPages: response.headers['x-wp-totalpages'],
        data: response.data.map(item => ({
          id: item.id,
          title: item.title.rendered,
          content: item.content.rendered,
          slug: item.slug
        }))
      })
    }
  })
    .catch((error) => {
      console.log(error)
    })
}

export const getPost = ({ commit, state }, slug) => {
  return new Promise((resolve, reject) => {
    request.get(`posts?slug=${slug}`).then((response) => {
      if (response.statusText === 'OK' && response.data.length > 0) {
        commit('POST', {
          content: response.data[0].content.rendered,
          author: response.data[0].author,
          date: response.data[0].date,
          date_gmt: response.data[0].date_gmt,
          excerpt: response.data[0].excerpt.rendered,
          featured_media: response.data[0].featured_media,
          guid: response.data[0].guid.rendered,
          link: response.data[0].link,
          slug: response.data[0].slug,
          title: response.data[0].title.rendered
        })
        resolve(response)
      } else {
        reject(response)
      }
    })
      .catch((error) => {
        console.log(error)
      })
  })
}

export const getCategory = ({ commit, state }, slug) => {
  return request.get(`categories?slug=${slug}`).then((response) => {
    if (response.statusText === 'OK' && response.data.length > 0) {
      return {
        id: response.data[0].id,
        name: response.data[0].name,
        slug: response.data[0].slug
      }
    }
  })
    .catch((error) => {
      console.log(error)
    })
    .then((category) => {
      return request.get(`posts?categories=${category.id}`).then((response) => {
        if (response.statusText === 'OK' && response.data.length > 0) {
          category.posts = response.data.map(item => ({
            id: item.id,
            title: item.title.rendered,
            content: item.content.rendered,
            slug: item.slug
          }))
          commit('CATEGORY', category)
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
