// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:true,
    userInfo:{}
  },

  
  onShow: function () {
    const userInfo=wx.getStorageSync('userInfo')
    
    if (userInfo.nickName) {
      this.setData({
        isLogin:false
      })
    } else {
      this.setData({
        isLogin:true
      })
    }
    this.setData({userInfo})
  },
  handleLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})
