// pages/category/category.js
import { request } from "../../request/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 右侧一级菜单列表
    rightContent: [], // 左侧内容列表
    currentIndex: 0,
    scrollTop: 0,
  },

  categories: [], //接口返回的数据
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 需要使用本地缓存
    // {time:Date.now(),data:data}
    let Cates = wx.getStorageSync('cates')
    if (!Cates) {
      this.getCates()
    } else {
      if ( Date.now() - Cates.time> 1000*10*60) {
        this.getCates()
      } else {
        this.categories=Cates.data
        let leftMenuList = this.categories.map(item => item.cat_name)
        let rightContent = this.categories[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  async getCates() {
    const res = await request({url: "/categories"})
    this.categories = res.data.message
      wx.setStorageSync('cates', { time: Date.now(), data: this.categories })
      let leftMenuList = this.categories.map(item => item.cat_name)
      let rightContent = this.categories[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
  },

  // 处理切换分类
  handleTap(e) {

    const { index } = e.currentTarget.dataset
    let rightContent = this.categories[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})