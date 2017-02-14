const config = require('../../comm/config')
Page({
    data: {
        id: '',
        addr: '',
        tel: '',
        name: '',
        movies: [],
        movieid: '',
        movieIndex: 0,
        dateIndex: 0,
        currentMovie: {},
        dates: [],
        dateShow: {},
        loading: true,
        scrollLeft: 0
    },
    onLoad: function (options) {
        const that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    left: res.windowWidth / 2 - 48
                })
            }
        })
        this.setData({
            id: options.id,
            addr: options.addr,
            tel: options.tel
        })
        //由于获取到的影院信息中电影图片地址无效，故调用此方法将对应图片做出相应的处理
        this.getCinema()
    },
    //对获取到的数据进行相应处理
    getCinema: function () {
        const that = this
        wx.request({
            url: config.apiList.cinema + that.data.id + '&movieid=' + that.data.movieid,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                let DateShow = res.data.data.DateShow
                for (let date in DateShow) {
                    for (let i = 0; i < DateShow[date].length; i++) {
                        let sellPrArray = DateShow[date][i].sellPrStr.split('<i>')
                        let PrArray = DateShow[date][i].prStr ? DateShow[date][i].prStr.split('<i>') : ''
                        let sellPr = ''
                        let pr = ''
                        if (sellPrArray.length > 2) {
                            sellPr = sellPrArray[2].substr(2, 2) + (sellPrArray[3] ? sellPrArray[3].substr(3) : '')
                        } else {
                            sellPr = sellPrArray[1].substr(2, 2)
                        }
                        if (PrArray) {
                            if (PrArray.length > 2) {
                                pr = PrArray[2].substr(2, 2) + (PrArray[3] ? PrArray[3].substr(3, 1) : '')
                            } else {
                                pr = PrArray[1].substr(2, 2)
                            }
                        }
                        DateShow[date][i].sellPr = sellPr
                        DateShow[date][i].pr = pr
                    }
                }
                //保存电影院名字
                that.setData({
                    name: res.data.data.cinemaDetailModel.nm,
                    addr: res.data.data.cinemaDetailModel.addr,
                    tel: res.data.data.cinemaDetailModel.tel,
                    currentMovie: res.data.data.currentMovie,
                    dates: res.data.data.Dates,
                    dateShow: DateShow,
                    dateIndex: res.data.data.Dates[0].slug
                })
                let movies = []
                //使用map方法对每一部电影的图片进行相应的处理并返回一个新的数组
                movies = res.data.data.movies.map(movie => {
                    const arr = movie.img.split('/')
                    const str = arr[arr.length - 1]
                    movie.img = 'http://p0.meituan.net/165.220/movie/' + str
                    return movie
                })
                that.setData({
                    movies,
                    loading: false
                })
                wx.stopPullDownRefresh()
            },
            fail: function () {
                wx.showToast({
                    title: '网络开小差了',
                    icon: 'loading'
                })
            }
        })
    },
    //获取选中电影的索引并保存
    chooseMovie: function (e) {
        const {index} = e.currentTarget.dataset
        this.setData({
            movieIndex: index,
            scrollLeft: 83 * index,
            movieid: this.data.movies[index].id
        })
        this.getCinema()
    },
    //获取选中日期的索引并保存
    chooseDate: function (e) {
        const {index} = e.currentTarget.dataset
        this.setData({
            dateIndex: index
        })
    },
    scrollChoose: function (e) {
        const {scrollLeft} = e.detail
        const movieIndex = Math.round(scrollLeft / 83)
        this.setData({
            movieIndex,
            scrollLeft: 83 * movieIndex
        })
    },
    onPullDownRefresh: function () {
        this.setData({
            movieIndex: 0,
            dateIndex: 0,
            loading: true,
            scrollLeft: 0
        })
        this.getCinema()
    }
})