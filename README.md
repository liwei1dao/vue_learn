# vue_learn
学习vue项目开发

# 适用插件
## scss 插件
npm install node-sass --save-dev
npm install sass-loader --save-dev

## svg,svgo 插件
npm install svg-sprite-loader --save
npm install svgo --save
package.json ->scripts 添加: "svgo": "svgo -f src/icons/svg --config=src/icons/svgo.yml"
创建 src/icons src/icons/svg 目录 

导入svg资源到 src/icons/svg 目录 下

创建 icons/index.js
```
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```
创建 icons/svgo.yml
...
# replace default config

# multipass: true
# full: true

plugins:

  # - name
  #
  # or:
  # - name: false
  # - name: true
  #
  # or:
  # - name:
  #     param1: 1
  #     param2: 2

- removeAttrs:
    attrs:
      - 'fill'
      - 'fill-rule'
...

创建 components/SvgIcon/index.vue
...
<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-on="$listeners"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
...
在 vue.config.js 下配置 
...
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
...
在 mian.js 中导入 import './icons' // icon
执行 npm run svgo
执行 npm run build  --重新编译才能生效
执行 npm run serve


## js-cookie 插件
npm install js-cookie --save

## nprogress 插件 Nprogress是一个JavaScript写的显示页面载入进度的小插件
npm install --save nprogress

## axios http请求插件 与后台通信用插件
npm install --save axios

## screenfull 全屏显示的插件
npm install --save screenfull

## fuse 模糊搜索插件
npm install --save fuse.js

## mockjs 插件模拟服务器数据
npm install mockjs --save-dev