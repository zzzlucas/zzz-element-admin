<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in cardlist" :key="item.title">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
          </div>
          <div class="count">{{item.count}}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <div style="text-align:center;padding:20px;font-size:20px;">上周充值记录</div>
        <div id="c1"></div>
      </el-col>
      <el-col :span="8">
        <div style="text-align:center;padding:20px;font-size:20px;">每月用户新增记录</div>
        <div id="c4"></div>
      </el-col>
      <el-col :span="8">
        <div style="text-align:center;padding:20px;font-size:20px;">用户成分</div>
        <div id="c3"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div style="text-align:center;padding:20px;font-size:20px;">上周充值记录</div>
        <div id="c2"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import G2 from "@antv/g2";
export default {
  data() {
    return {
      cardlist: []
    };
  },
  mounted() {
    this.getc1();
    this.getc2();
    this.getc4();
    this.getc3();
  },
  created() {
    this.$get("/system/homestatisiccount").then(res => {
      this.cardlist = res.data;
    });
  },
  methods: {
    getc4() {
      function addPoint(collection, point) {
        var count =
          arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        for (var i = 0; i < count; i++) {
          collection.push(point);
        }
      }

      function getCount(x, y, medianX, medianY) {
        var distance = Math.pow(x - medianX, 2) + Math.pow(y - medianY, 2);
        if (distance < 4) {
          return 3;
        } else if (distance < 16) {
          return 3;
        } else if (distance < 64) {
          return 2;
        }
        return 1;
      }

      // console.log(userData);
      var userDv = new DataSet.View().source(userData).transform({
        // sizeByCount: true,
        type: "bin.hexagon",
        fields: ["longitude", "latitude"],
        binWidth: [2, 3],
        as: ["longitude", "latitude", "count"]
      });
      // console.log(userDv);

      var chart = new G2.Chart({
        container: "c4",
        width: 600,
        height: 500
      });
      chart.scale({
        latitude: {
          sync: true,
          nice: false
        },
        longitude: {
          sync: true,
          nice: false
        }
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip(false);

      var geoView = chart.view();
      geoView.source(geoDv);
      geoView
        .polygon()
        .position("longitude*latitude")
        .color("grey")
        .opacity(0.3);

      var userView = chart.view();
      userView.source(userDv);
      userView
        .polygon()
        .position("longitude*latitude")
        .color("count", "#BAE7FF-#1890FF-#0050B3")
        .style({
          lineWidth: 10,
          stroke: "white"
        });
      chart.render();
    },
    getc3() {
      var data = [
        {
          item: "1",
          count: 40000,
          percent: 0.4
        },
        {
          item: "0",
          count: 20001,
          percent: 0.21
        },
        {
          item: "0.5",
          count: 170000,
          percent: 0.17
        },
        {
          item: "其他",
          count: 13000,
          percent: 0.13
        }
      ];
      var chart = new G2.Chart({
        container: "c3",
        width: 600,
        height: 500
      });
      chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            val = val * 100 + "%";
            return val;
          }
        }
      });
      chart.coord("theta");
      chart.tooltip({
        showTitle: false
      });
      chart
        .intervalStack()
        .position("percent")
        .color("item")
        .label("percent", {
          offset: -40,
          // autoRotate: false,
          textStyle: {
            textAlign: "center",
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)"
          }
        })
        .tooltip("item*percent", function(item, percent) {
          percent = percent * 100 + "%";
          return {
            name: item,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
      chart.render();
    },
    getc1() {
      const data = [
        { genre: "周一", sold: 275 },
        { genre: "周二", sold: 275 },
        { genre: "周三", sold: 275 },
        { genre: "周四", sold: 115 },
        { genre: "周五", sold: 120 },
        { genre: "周六", sold: 350 },
        { genre: "周日", sold: 150 }
      ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      // Step 1: 创建 Chart 对象
      const chart = new G2.Chart({
        container: "c1", // 指定图表容器 ID
        width: 600, // 指定图表宽度
        height: 500 // 指定图表高度
      });
      // Step 2: 载入数据源
      chart.source(data);
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart
        .interval()
        .position("genre*sold")
        .color("genre");
      // Step 4: 渲染图表
      chart.render();
    },
    getc2() {
      var data = [
        {
          year: "1",
          value: 3444
        },
        {
          year: "2",
          value: 42222
        },
        {
          year: "3",
          value: 3335
        },
        {
          year: "4",
          value: 5222
        },
        {
          year: "5",
          value: 11114
        },
        {
          year: "6",
          value: 4556
        },
        {
          year: "7",
          value: 72222
        },
        {
          year: "8",
          value: 9444
        }
      ];
      var chart = new G2.Chart({
        container: "c2",
        forceFit: true,
        height: 500
      });
      chart.source(data);
      chart.scale("value", {
        min: 0
      });
      chart.scale("year", {
        range: [0, 1]
      });
      chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      chart.line().position("year*value");
      chart
        .point()
        .position("year*value")
        .size(4)
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      chart.render();
    }
  }
};
</script>

<style>
.count {
  font-size: 30px;
  padding: 30px;
  text-align: center;
  color: rgba(226, 145, 79, 0.616);
}
</style>
