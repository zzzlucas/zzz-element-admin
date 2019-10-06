<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:15px 0;">
      <el-button type="primary" @click="isshowaddmodal=true">添加演出</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;">
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
    <div style="display:flex;justify-content:center;">
      <el-pagination
        @current-change="getShowList"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
      ></el-pagination>
    </div>

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

    <el-dialog title="添加演出" :visible.sync="isshowaddmodal">
      <div style="display:flex;justify-content:space-between">
        <el-upload
          class="avatar-uploader"
          :action="uploadeurl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form ref="form" :model="form" label-width="80px" style="flex:1">
          <el-form-item label="演出名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="艺人">
            <el-input v-model="form.artist"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-cascader :props="cityprops" v-model="form.city"></el-cascader>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="演出时间">
            <el-col :span="11">
              <el-date-picker
                v-model="form.showtime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="开始售票">
            <el-switch v-model="form.state" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="演出标签">
            <el-checkbox-group v-model="form.tags">
              <el-checkbox label="市政文化补贴" name="type"></el-checkbox>
              <el-checkbox label="公益" name="type"></el-checkbox>
              <el-checkbox label="十周年" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="演出类型">
            <el-radio-group v-model="form.typeid">
              <el-radio :label="1">演唱会</el-radio>
              <el-radio :label="11">音乐会</el-radio>
              <el-radio :label="2">戏剧</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="购票说明">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "./showlist.css";
import showlist from "./showlist";
export default showlist;
</script>

