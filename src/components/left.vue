<template>
  <nav style="background:#545c64;position:relative">
    <i
      class="collapsebtn"
      :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"
      @click="isCollapse=!isCollapse"
    ></i>
    <el-menu
      :collapse="isCollapse"
      default-active="0"
      :default-openeds="[]"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :unique-opened="true"
      active-text-color="#558FF2"
      :router="true"
    >
      <el-menu-item index="0" route="/">
        <i class="el-icon-menu"></i>
        <span slot="title">工作平台</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item route="/showlist" index="1-1">用户列表</el-menu-item>
          <el-menu-item index="1-2">封号列表</el-menu-item>
          <el-menu-item index="1-4">VIP列表</el-menu-item>
          <el-menu-item index="1-3">用户统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">说说管理</el-menu-item>
          <el-menu-item index="2-2">图片管理</el-menu-item>
          <el-menu-item index="2-3">评论管理</el-menu-item>
          <el-menu-item index="2-4">举报管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-present"></i>
          <span>商城管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">商品列表</el-menu-item>
          <el-menu-item index="4-2">订单列表</el-menu-item>
          <el-menu-item index="4-3">售后管理</el-menu-item>
          <el-menu-item index="4-4">供应商管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-office-building"></i>
          <span>门店管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">门店列表</el-menu-item>
          <el-menu-item index="5-2">业务员列表</el-menu-item>
          <el-menu-item index="5-3">业绩统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-cpu"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">Banner管理</el-menu-item>
          <el-menu-item index="3-2">客服管理</el-menu-item>
          <el-menu-item index="3-3">密码管理</el-menu-item>
          <el-menu-item index="3-4">日志管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  watch: {
    isCollapse(val) {
      this.$emit("collapse-change", val);
    }
  }
};
</script>

<style>
.collapsebtn {
  color: #fff;
  position: absolute;
  bottom: 100px;
  cursor: pointer;
  user-select: none;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 20px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  /* */
}
</style>
