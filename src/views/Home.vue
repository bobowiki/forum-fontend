<template>
  <div class="home-container">
    <el-container class="home-container">
      <el-aside :width="collapse ? 0 : '300px'">
        
      </el-aside>
      <el-container>
        <el-header><el-button type="primary" @click="avatar">折叠</el-button></el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: false
    }
  },
  methods: {
    avatar() {
      this.collapse = !this.collapse
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  height: 100%;
  background-color: #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  transition: all 0.3s;
}
.el-header {
  background-color: #bfa;
}
</style>
