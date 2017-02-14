//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    loading: true,
    banners: [],
    hometab: [],
    active:false,
    windowHeight: 0,
    windowWidth: 0,
    activeId: -1,
    activityUrls: [         // 四个模块图片链接
      'http://m.ipinbb.com/ipbb/static/images/home-01.png',
      "http://m.ipinbb.com/ipbb/static/images/home-02.png",
      "http://m.ipinbb.com/ipbb/static/images/home-03.png",
      "http://m.ipinbb.com/ipbb/static/images/home-04.png"
    ],
    goods: []
  },
  //
  scroll:function(e){
   let targetY=640/750*this.data.windowWidth;
    if(e.detail.scrollTop> targetY){
      this.setData({
        active:true
      })
    }else{
       this.setData({
        active:false
      })
    }
    console.log(this.data.active)
  },
  //导航栏切换获取内容
  taplink: function (e) {
    let that = this
    this.setData({
      activeId: e.currentTarget.dataset.tabid
    })
    let currentTab = {}
    this.data.hometab.forEach(function (item) {
      if (item.tabId == e.currentTarget.dataset.tabid) {
        currentTab = item
      }
    })
    wx.request({
      url: 'http://m.ipinbb.com/ipbb/home/load?ti=' + currentTab.tabId + '&ft=' + currentTab.tabFilterType,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          goods: res.data.lst
        })
      },
    })
  },
  onLoad: function () {
    let that = this
    wx.request({
      url: 'http://service.ipinbb.com:8080/goodsService/getHomeBanner',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          banners: res.data.lst
        })
      }
    })
    wx.request({
      url: 'http://service.ipinbb.com:8080/goodsService/getHomeTabs',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          hometab: res.data
        })
      }
    })
    wx.request({
      url: 'http://m.ipinbb.com/ipbb/home/load?ti=-1&ft=Home',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          goods: res.data.lst
        })
      },
    })
    this.setData({
      loading: false
    })
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  }
})
