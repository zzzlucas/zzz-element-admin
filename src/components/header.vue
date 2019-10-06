<template>
  <header
    style="display:flex;background-color:#545c64;align-items:center;justify-content:space-between;padding:0 20px;"
  >
    <img
      src="https://dn-web-blued-cn.qbox.me/web/static/profile/nav-logo-becf43db.png"
      style="width:130px;height:30px"
    />
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#558FF2"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Simba</template>
        <el-menu-item index="2-1">修改密码</el-menu-item>
        <el-menu-item index="2-3" @click="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm("确定退出?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
</style>
