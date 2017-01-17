import request from 'axios'
import api from '../api/index'

request.defaults.baseURL = 'http://wpvue.peabay.xyz/wp-json/wp/v2/'

export const getPage = ({ commit, state }, slug) => {
  return new Promise((resolve, reject) => {
    api.getPage(slug)
    .then(
      response => {
        commit('PAGE', response)
        resolve(response)
      },
      response => {
        reject(response)
      }
    )
  })
}

export const getPost = ({ commit, state }, slug) => {
  return new Promise((resolve, reject) => {
    api.getPost(slug)
    .then(
      response => {
        commit('POST', response)
        resolve(response)
      },
      response => {
        reject(response)
      }
    )
  })
}

export const getPosts = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    api.getPosts()
    .then(
      response => {
        commit('POSTS', response)
        resolve(response)
      },
      response => {
        reject(response)
      }
    )
  })
}

export const getCategory = ({ commit, state }, slug) => {
  return new Promise((resolve, reject) => {
    api.getCategory(slug)
    .then(
      response => {
        commit('CATEGORY', response)
        resolve(response)
      },
      response => {
        reject(response)
      }
    )
  })
}
