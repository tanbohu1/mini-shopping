import { login } from "../../request/asyncWx"
import { request } from "../../request/request"


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async getUserInfo(e) {
    // console.log(e)
    try {
      const { encryptedData, iv, rawData, signature } = e.detail
      const { code } = await login()
      let loginParams = { encryptedData, iv, rawData, signature, code }
      const res = await request({
        url: '/users/wxlogin',
        data: loginParams,
        method: "post"
      })
      // console.log(res)
      // 此处是无法获取token的，因为是个人账号
      // const {token} = res
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      // 以上是接口里面的token
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1
      })

    } catch (error) {
      console.log(error)
    }
  }
})