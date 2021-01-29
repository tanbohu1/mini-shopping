import {request} from "../../request/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    collected:false
  },

  // goodDetails
  goodsDetail:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
    this.initCollected(goods_id)
  },
  initCollected(goods_id){
    
    let collectList = wx.getStorageSync('collect')||[]
    // console.log(collectList)
    const index = collectList.findIndex(v=>v.goods_id==goods_id)
    if (index==-1) {
      // 如果不存在
      // console.log("不存在")
      this.setData({
        collected:false
      })

    } else{
      // 存在
      // console.log("cunzai")
      this.setData({
        collected:true
      })
    }
  },
  onShow(){
    

  },

  async getGoodsDetail(goods_id){
    const res = await request({
      url:"/goods/detail",
      data:{goods_id}
    })
    // console.log(res)
    this.goodsDetail = res.data.message
    // console.log(this.goodsDetail)
    this.setData({
      goodsObj:{
        goods_id:this.goodsDetail.goods_id,
        goods_name:this.goodsDetail.goods_name,
        goods_price:this.goodsDetail.goods_price,
        goods_introduce:this.goodsDetail.goods_introduce,
        pics:this.goodsDetail.pics
      }
    })
  },

  handlePreviewImage(e){
    const index = e.currentTarget.dataset.index
    // console.log(e)
    const urls = this.goodsDetail.pics.map(i=>i.pics_mid)
    wx.previewImage({
      current:urls[index],
      urls
    })
  },

  addToCart(){
    // 通过本地缓存模拟后台购物车数据
    // 获取本地缓存的数据，判断有没有该商品，如果有+1，如果没有，添加商品
    
    let Carts = wx.getStorageSync('carts')||[]
    const {goods_id} = this.goodsDetail
    let index = Carts.findIndex(v=>v.goods_id===goods_id)
    // console.log(index)
    if (index>-1) {
      Carts[index].num++
    } else {
      this.goodsDetail.num=1
      this.goodsDetail.checked=false
      Carts.unshift(this.goodsDetail)
      // wx.showToast({
      //   title: '添加成功',
      //   success:true,
      //   mask:true
      // })
      // wx.setStorageSync('carts', Carts)
    }
    wx.showToast({
      title: '添加成功',
      success:true,
      mask:true
    })
    wx.setStorageSync('carts', Carts)
  },

  // 收藏 collectList[{goodsObj}]
  handleCollect(){
    const {goods_id} = this.goodsDetail
    let collectList = wx.getStorageSync('collect')||[]
    const index = collectList.findIndex(v=>v.goods_id===goods_id)
    if (index==-1) {
      // 如果不存在，则收藏
      collectList.push(this.goodsDetail)
      wx.showToast({
        title: '收藏成功！',
      })
      // console.log("shucang")
    } else{
      // 存在则取消收藏
      collectList.splice(index,1)
      // console.log("bushoucang")
      wx.showToast({
        title: '取消收藏',
      })
    }
    wx.setStorageSync('collect', collectList)
    this.setData({
      collected:!this.data.collected
    })
  }
})