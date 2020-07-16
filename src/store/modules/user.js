import {login, logout } from '@/api/user'
import {getToken, setToken,removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userinfo : null,
  // name: '',
  // avatar: '',
  // introduction: '',
  // roles: []
}

const mutations = {
  SET_USERINFO:(state,userinfo) => {
    state.userinfo = userinfo
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    console.log("登陆：",account,password)
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        const { data } = response
        console.log("登陆回应：",data)
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { token,  name, avatar, introduction,roles,} = data
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_TOKEN', token)
        commit('SET_USERINFO',{name:name,avatar:avatar,introduction:introduction,roles:roles})
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit,state}) {
    if (state.userinfo != null){
      return state.userinfo
    }else{
      return new Promise((resolve, reject) => {
        login( {token: state.token}).then(response => {
          const { data } = response
          console.log("登陆回应：",data)
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { token,  name, avatar, introduction,roles,} = data
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_TOKEN', token)
          commit('SET_USERINFO',{name:name,avatar:avatar,introduction:introduction,roles:roles})
          setToken(token)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
   // user logout
   logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', null)
        removeToken()
        resetRouter()
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USERINFO', null)
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}