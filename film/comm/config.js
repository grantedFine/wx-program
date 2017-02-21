const url = 'https://platform.mobile.meituan.com/open/maoyan'
module.exports = {
    apiList: {
        //获取城市列表
        cityList:url+'/v1/cities.json',
        //获取指定城市电影院信息，示例：http://platform.mobile.meituan.com/open/maoyan/v1/cinemas.json?ct=武汉
        cityCinemas:url+'/v1/cinemas.json?ct=',
        //获取指定电影院(cinemaid)信息，示例：http://m.maoyan.com/showtime/wrap.json?cinemaid=896
        cinema:'https://m.maoyan.com/showtime/wrap.json?cinemaid=',
        //获取指定电影院(cinemaid)信息(plan B)，
        //示例：http://platform.mobile.meituan.com/open/maoyan/v1/cinema/896/movies/shows.json
        cinemaB:'https://platform.mobile.meituan.com/open/maoyan/v1/cinema/',
        //选座，示例：http://m.maoyan.com/show/seats?showId=76304&showDate=2017-01-07
        seats:'https://m.maoyan.com/show/seats?'
    }
}