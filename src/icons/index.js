import Vue from 'vue'
import Svgicon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', Svgicon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)