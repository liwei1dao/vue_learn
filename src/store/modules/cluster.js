
const state = {
  baseinfo : {tag:""}
}
import {getbaseinfo } from '@/api/cluster'

const mutations = {
  SET_BASEINFO: (state, baseinfo) => {
    state.baseinfo = baseinfo
  }
}

const actions = {
  getbaseinfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getbaseinfo(state.token).then((response) => {
        const { data } = response
        console.log("getbaseinfo ret：",data)
        if (!data) {
          reject('getbaseinfo failed, please Login again')
        }
        const {tag} = data
        commit('SET_BASEINFO', {tag:tag})
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
