// 引入request promise方法
import { request } from "../../request/request.js"

Page({
  /** 
   * 页面的初始数据
   */

  data: {
    swiperList: [], //轮播图列表
    catesList: [], //导航列表
    floorList: [], // 楼层列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图列表
    this.getSwiperList()

    // 获取导购列表
    this.getCatesList()

    // 获取楼层列表
    this.getFloorList()

  },

  // 获取轮播图
  async getSwiperList() {
    // request({
    //   url: '/home/swiperdata'
    // })
    //   .then(result => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   })
    const res = await request({ url: '/home/swiperdata' })
    this.setData({
      swiperList: res.data.message
    })
  },
  // 获取导购列表
  async getCatesList() {
    const res = await request({url: '/home/catitems'})
    this.setData({
      catesList: res.data.message
    })
  },

  // 获取楼层列表
  async getFloorList() {
    const res = await request({url: '/home/floordata'})
    this.setData({
      floorList:res.data.message
    })
  }

})