// pages/cinema/cinema.js
Page({
    data: {
        limit: 12,
        loading: false,
        inputShowed: false,
        cinemas: {}
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            loading: false
        })
        this.getCinemas()
    },
  
    getCinemas: function() {
        var that = this
        wx.request({
            url: "https://m.maoyan.com/cinemas.json" ,
            type: "application/json",
            success: function(res) {
              if(res.data.error){
                  that.setData({
                      loading:true,
                  })
                  wx.showToast({
                      title:'未收录该城市信息',
                      icon:'loading'
                  })
              }else{
                  let cinemas=[]
                 for(var i in res.data.data){
                    let a={}
                    a.area=i
                    a.data=res.data.data[i]
                    a.open=false
                    cinemas.push(a)
                 }
                 cinemas[0].open=true
                that.setData({
                    cinemas,
                    loading: true,
                })
            }
            },
            fail:function(res){
                wx.showToast({
                    title:'网络开小差了',
                    icon:'loading'
                })
            }
        })
    },
    toggle: function(e) {
        console.log(e)
        let index = e.currentTarget.dataset.index
        let cinemas=this.data.cinemas
       for(let i in cinemas){
         if(i!=index)  cinemas[i].open=false
       }
       cinemas[index].open=!cinemas[index].open
       this.setData({
           cinemas
       })
    },
    pullDownRefresh: function(e) {
        this.onLoad()
    },
    pullUpLoad: function(e) {
        var limit = this.data.limit + 6
        console.log(limit)
        this.setData({
            limit: limit
        })
        this.onShow()
    }
})