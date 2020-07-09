import Vue from 'vue'
import svgicon from '@/components/svgIcon'// svg component

// register globally
Vue.component('svg-icon', svgicon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)