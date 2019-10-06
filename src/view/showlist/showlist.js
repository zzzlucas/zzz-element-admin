import utils from "@/utils";
import config from '@/config'
export default {
  data() {
    return {
      uploadeurl: config.CONSTANT.BASEURL + config.CONSTANT.UPLOADEURL,
      isshowaddmodal: false,
      dialogTableVisible: false,
      tableData: [],
      detailInfo: {},
      loading: false,
      totalCount: 0,
      imageUrl: '',
      pageSize: 5,
      cityprops: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          const { level, value } = node;
          if (level === 0) {
            this.$get("/sys/provinces").then(res => {
              var nodes = res.data.map(r => {
                return {
                  value: r.provinceid,
                  label: r.province,
                  leaf: level >= 2
                };
              });
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            });
          } else if (level === 1) {
            this.$get("/sys/cities", {
              params: {
                pid: value
              }
            }).then(res => {
              var nodes = res.data.map(r => {
                return {
                  value: r.cityid,
                  label: r.city,
                  leaf: level >= 2
                };
              });
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            });
          } else if (level === 2) {
            this.$get("/sys/counties", {
              params: {
                pid: value
              }
            }).then(res => {
              var nodes = res.data.map(r => {
                return {
                  value: r.areaid,
                  label: r.area,
                  leaf: level >= 2
                };
              });
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            });
          }
        }
      },
      form: {
        title: "",
        img: "",
        showtime: "",
        city: "",
        tags: [],
        address: '',
        artist: '',
        state: 0,
        desc: "",
        typeid: 0
      }
    };
  },
  created() {
    this.getShowList();
    this.getShowCount();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isIMG = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMG) {
        this.$message.error('上传头像必须是图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isIMG && isLt2M;
    },
    onSubmit() {
      console.log(this.form);
      this.$get("/show/add", {
        params: this.form
      }).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.isshowaddmodal = false
          this.getShowList();
          this.getShowCount();
        }
      })
    },
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
    getShowCount() {
      this.$get("/show/showTotalCount").then(res => {
        this.totalCount = res.data.totalCount;
      });
    },
    getShowList(pageIndex = 1) {
      this.$get("/show/showList", {
        params: { pageIndex, pageSize: this.pageSize }
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