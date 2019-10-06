<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" style="margin-top:20px;">添加</el-button>

    <el-table :data="tableData" border style="width: 100%;margin:20px 0;">
      <el-table-column prop="id" label="编号" width="50"></el-table-column>
      <el-table-column prop="img" label="海报" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="width:60px;height:80px;" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="city" label="城市" width="100"></el-table-column>
      <el-table-column prop="address" label="地址" width="180"></el-table-column>
      <el-table-column prop="artistname" label="艺人" width="100"></el-table-column>
      <el-table-column prop="showtime" :formatter="fmtTime" label="时间" width="180"></el-table-column>
      <el-table-column prop="type" label="类型" width="100"></el-table-column>
      <el-table-column prop="state" :formatter="fmtState" label="状态" width="100"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="detail(scope.row.id)" icon="el-icon-search" circle></el-button>
          <el-button type="warning" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详情" :visible.sync="dialogTableVisible">
      <div style="display:flex;height:500px" v-loading="loading">
        <el-image
          style="width: 100px; height: 100px"
          :src="detailInfo.img"
          :preview-src-list="[detailInfo.img]"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>

        <div>
          <h1>{{detailInfo.title}}</h1>
          <h1>{{detailInfo.showtime}}</h1>
          <h1>{{detailInfo.city}}</h1>
          <h1>{{detailInfo.address}}</h1>
          <ul>
            <li v-for="item in detailInfo.pricelist">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import utils from "@/utils";
export default {
  data() {
    return {
      dialogTableVisible: false,
      tableData: [],
      detailInfo: {},
      loading: false
    };
  },
  created() {
    this.getShowList();
  },
  methods: {
    
    del(id) {
      this.$confirm("删除后无法恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$get("/show/del", {
          params: { id }
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getShowList();
          } else {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          }
        });
      });
    },
    fmtTime(row, column, cellValue, index) {
      var time = utils._.convertMysqlTime2JSTime(cellValue);
      return time.getFormatDate() + " " + time.getFormatTime();
    },
    fmtState(row, column, cellValue, index) {
      return ["售票中", "待开票", "售罄"][cellValue];
    },
    getShowList() {
      this.$get("/show/showList", {
        params: { pageIndex: 1, pageSize: 5 }
      }).then(res => {
        this.tableData = res.data;
      });
    },
    detail(id) {
      this.dialogTableVisible = true;
      this.detailInfo = {};
      this.loading = true;
      this.$get("/show/detail", {
        params: {
          id
        }
      }).then(res => {
        this.loading = false;
        this.detailInfo = res.data.detail;
        this.detailInfo.pricelist = res.data.pricelist;
      });
    }
  }
};
</script>

<style>
</style>
