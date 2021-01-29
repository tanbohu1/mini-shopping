// pages/goods_list/goods_list.js
import {request} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[
      {
      index:0,
      name:"综合",
      active:true
      },
      {
        index:1,
        name:"销量",
        active:false
      },
      {
        index:2,
        name:"价格",
        active:false
      }
  
    ],
    goodsList:[]
  },

  // 请求列表参数
  QueryParams:{
    query:'',
    cid:1,
    pagenum:1,
    pagesize:10
  },

  // 公共数据 总页数
  totalPage:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.QueryParams.cid=options.cid
    this.getGoodsList()
  },

  // 获取商品的函数
  async getGoodsList(){
    const res = await request(
      {url:"/goods/search",
      data:this.QueryParams}
    )
    const {total,goods} = res.data.message
    this.totalPage=Math.ceil(total/this.QueryParams.pagesize)
    this.setData({goodsList:[...this.data.goodsList,...goods]})
    // console.log(res)

    // 关闭下拉刷新窗口 即使没有下拉操作，也不会与这个函数冲突
    wx.stopPullDownRefresh()
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

  // 加载
  onReachBottom(){
    // 判断是否还有数据，有的话继续发送请求，没有的话则显示无数据
    if (this.QueryParams.pagenum<this.totalPage) {
      //有数据
      this.QueryParams.pagenum++
      this.getGoodsList()
    }else{
      // 没有数据
      wx.showToast({
        title: '没有下一页数据了',
      })
    }
  },
  onPullDownRefresh(){
    // 下拉刷新
    // 清空商品列表
    this.setData({goodsList:[]})
    this.QueryParams.pagenum=1
    this.getGoodsList()
  }
})