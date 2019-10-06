import Mock from "mockjs";

Mock.mock("/system/homestatisiccount", [
    {
        title: "昨日新增用户",
        count: 20
    }, {
        title: "昨日投诉举报",
        count: 10
    }, {
        title: "昨日充值总额",
        count: 100000
    },
    {
        title: "用户总数",
        count: 300000
    }, {
        title: "活跃用户总数",
        count: 182000
    }, {
        title: "VIP用户总数",
        count: 60000
    }
])