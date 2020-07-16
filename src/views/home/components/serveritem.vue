<template>
  <el-card class="box-card,serveritem">
    <div v-for="o in 4"
         :key="o"
         class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.serveritem {
  width: 400px;
}
</style>