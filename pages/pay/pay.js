import { request } from "../../request/request"
import {requestPayment} from "../../request/asyncWx"


Page({

  data: {
    addressInfo: {},
    cartList: [],
    totalNum: 0,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const addressInfo = wx.getStorageSync('address')
    this.Carts = wx.getStorageSync('carts') || []
    let cartList = []
    let totalPrice = 0
    let totalNum = 0
    this.Carts.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
        cartList.push(v)
      }
    })
    this.setData({
      addressInfo,
      cartList,
      totalNum,
      totalPrice
    })
  },
  async handlePay() {
    try {
      // 判断是否有用户token，没有的话跳转授权页面
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth',
        })
        return
      }
      // 有token值，发起创建订单的请求
      // console.log(token)
      // const header = { Authorization: token }
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.addressInfo.addressName
      let goods = []
      this.data.cartList.forEach((v) => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        })
      })
      const orderParams = { order_price, consignee_addr, goods };
      // console.log(orderParams)
      // 发起创建订单，获取订单编号order_number
      const result1 = await request({
        url: "/my/orders/create",
        data: orderParams,
        method: "post"
      })
      // console.log(result1.data.message.order_number)
      const order_number=result1.data.message.order_number
      // 发起预支付
      const  result2 = await request({
        url: "/my/orders/req_unifiedorder",
        data: { order_number },
        method: "post"
      })
      // console.log(result2.data.message.pay)
      const {pay} = result2.data.message
      // 发起支付
      await requestPayment(pay);
      console.log(result2.data.message.pay)
      //查看支付状态
      const res = await request({
        url: "/my/orders/chkOrder",
        data: { order_number },
        method: "post"
      })
      console.log(res)
      // 删除购物车已支付的的商品（！checked）
      let newCarts = this.Carts.filter(v => !v.checked)
      wx.setStorageSync('carts', newCarts)
      wx.navigateTo({
        url: '/pages/cart/cart',
      })
    } catch (error) {
      wx.showToast({
        title: '支付失败',
        icon:'none'
      })
      console.log(error)
    }


  }
})