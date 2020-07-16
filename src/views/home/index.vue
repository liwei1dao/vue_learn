<template>
  <div class="home-container">
    <div v-loading="loading">
      <div v-if="!loading">
        <el-row class="baseitem">
          <el-col class="baseitem-l"
                  :span="1">
            集<i style="padding: 14px;"></i>群:
          </el-col>
          <el-col class="baseitem-r"
                  :span="23">
            {{baseinfo.tag}}
          </el-col>
        </el-row>
        <el-row>
          <el-col class="baseitem-l"
                  :span="1">
            负<i style="padding: 3px;"></i>责<i style="padding: 3px;"></i>人:
          </el-col>
          <el-col class="baseitem-r"
                  :span="23">
            李伟
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
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
  .baseitem {
    margin-bottom: 20px;
    .baseitem-l {
      font-weight: normal;
    }
    .baseitem-r {
      // margin-right: 30px;
      font-weight: bolder;
    }
  }
}
</style>

