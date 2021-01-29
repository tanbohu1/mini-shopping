import {request} from "../../request/request"

Page({
  data: {
    tabList:[
      {
      index:1,
      name:"全部",
      active:true
      },
      {
        index:2,
        name:"待付款",
        active:false
      },
      {
        index:3,
        name:"待发货",
        active:false
      },
      {
        index:4,
        name:"退款/退货",
        active:false
      }
    ],
    orderList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.getOrderList(options.type)
  },

 
  onShow: function () {

  },

  handleChangeTab(e){
    // console.log(e.detail)
    const index = e.detail
    // const tabList = this.data.tabList
    // tabList.forEach(item=>{
    //   item.index===index?item.active=true:item.active=false
    // })
    // this.setData({tabList})
    console.log(index)
    this.getOrderList(index)
  },
  // 获取订单列表
  async getOrderList(type){
    const res = await request({
      url:"/my/orders/all",
      data:{type}
    })
    const tabList = this.data.tabList
    tabList.forEach(v=>{v.index==type?v.active=true:v.active=false})
    this.setData({
      orderList:res.data.message,
      tabList
    })
  }

})