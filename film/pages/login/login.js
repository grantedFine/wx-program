// pages/login/login.js
const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
    data: {
        tabs: ["账号密码登录", "手机号快捷登录"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0,
        user: {
            name: [],
            pwd: []
        }
    },
    username: function(e) {
        this.data.user.name = e.detail.value
            //this.data.name=e.detail.value
    },

    userpwd: function(e) {
        this.data.user.pwd = e.detail.value
            //this.data.pwd=e.detail.value 
    },
    userphone: function(e) {
        this.data.user.phonenum = e.detail.value
            //this.data.name=e.detail.value
    },

    userpwd: function(e) {
        this.data.user.num = e.detail.value
            //this.data.pwd=e.detail.value 
    },

    onLoad: function() {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
                });
            }
        });
    },
    tabClick: function(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});