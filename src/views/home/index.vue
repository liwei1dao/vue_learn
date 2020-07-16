<template>
  <div class="home-container"
       v-loading="loading">
    <div v-if="!loading">
      <h1>{{baseinfo.tag}}</h1>
      <p>文章，满族，陕西西安人，中国大陆男演员、导演。2006年毕业于中央戏剧学院表演系。曾获大众电影百花奖最佳男演员，金鸡奖最佳导演处女作奖，金鹰奖最具人气男演员等奖项。2018年文章入选《中国电视剧60年大系·人物卷》。2019年7月28日，文章宣布和马伊琍离婚，两人育有两女</p>
      <el-divider></el-divider>
      <el-row class="serverlist"
              :gutter="24">
        <el-col :xs="8"
                :sm="6"
                :md="4"
                :lg="3">
          <ServerItem />
        </el-col>
        <el-col :xs="8"
                :sm="6"
                :md="4"
                :lg="3">
          <ServerItem />
        </el-col>
        <el-col :xs="8"
                :sm="6"
                :md="4"
                :lg="3">
          <ServerItem />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ServerItem from './components/serveritem'
export default {
  name: 'Home',
  components: {
    ServerItem,
  },
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters([
      'baseinfo'
    ])
  },
  beforeMount () {
    this.getbaseinfo()
  },
  methods: {
    getbaseinfo () {
      this.loading = true
      this.$store.dispatch('cluster/getbaseinfo', this.loginForm)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>


<style lang="scss" scoped>
.home-container {
  padding: 30px;
  .serverlist {
    .el-col {
    }
  }
}
</style>

