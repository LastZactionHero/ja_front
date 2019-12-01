// import axios from 'axios'

export const state = () => ({
  cards: []
})

export const mutations = {
  shift(state) {
    if (state.cards.length) {
      state.cards.shift()
    }
  },

  rotate(state) {
    if (state.cards.length) {
      const card = state.cards.shift()
      state.cards.push(card)
    }
  },

  append(state, payload) {
    state.cards.push(payload.card)
  }
}

export const getters = {
  current(state) {
    return state.cards[0]
  }
}

export const actions = {
  fetch({ commit }) {
    this.$axios.$get('/dev/deck').then(data => {
      data.forEach(card => {
        commit('append', { card })
      })
    })
  },

  correct({ commit }, { card }) {
    this.$axios.$post(`/dev/terms/${card.uuid}/success`).then(data => {
      commit('shift')
    })
  },

  incorrect({ commit }, { card }) {
    this.$axios
      .$post(`/dev/terms/${card.uuid}/fail`)
      .then(data => {
        commit('rotate')
      })
      .catch(error => {
        alert(JSON.stringify(error))
      })
  }
}
