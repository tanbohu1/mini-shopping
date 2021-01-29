let reqNum = 0

export const request = (params) => {
    let header = { ...params.header }
    if (params.url.includes("/my/")) {
        let token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth',
            })
            token = wx.getStorageSync('token')
        }
        header["Authorization"] = token
    }


    //解决多次同时发送请求，loading加载问题
    reqNum++
    // 定义公共URL
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header: header,
            url: baseURL + params.url,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {
                reqNum--
                if (reqNum == 0) {
                    wx.hideLoading()
                }
            }
        })
    })
}