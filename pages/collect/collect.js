// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[
      {
      index:0,
      name:"商品收藏",
      active:true
      },
      {
        index:1,
        name:"品牌收藏",
        active:false
      },
      {
        index:2,
        name:"店铺收藏",
        active:false
      },
      {
        index:3,
        name:"浏览足迹",
        active:false
      }
    ],
    collectLists:[],
    tagList:[
      {
        index:0,
        name:'全部',
        active:true
      },
      {
        index:1,
        name:'正在热卖',
        active:false
      },
      {
        index:2,
        name:'即将上线',
        active:false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const collectLists= wx.getStorageSync('collect')||[]
    this.setData({
      collectLists
    })
  },
  
  handleChangeTab(e){
    // console.log(e.detail)
    const index = e.detail
    const tabList = this.data.tabList
    tabList.forEach(item=>{
      item.index===index?item.active=true:item.active=false
    })
    this.setData({tabList})
  },
  handleChangeTag(e){
    const {index}=e.currentTarget.dataset
    const tagList = this.data.tagList
    tagList.forEach(item=>{
      item.index===index?item.active=true:item.active=false
    })
    this.setData({tagList})

  }

})