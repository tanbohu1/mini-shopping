import { getSetting, chooseAddress, openSetting } from "../../request/asyncWx"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: { addressName: "", telNumber: "" },
    cartList: [],
    checkedAll: false,
    totalNum: 0,
    totalPrice: 0
  },
  Carts: [1],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  onShow: function () {
    this.getCartList()
    // 计算是否全选、总价格、总数量 changeAll
    this.computeAll()
  },
  computeAll() {
    let checkedAll = this.Carts.every(v => v.checked)
    let totalPrice = 0
    let totalNum = 0
    this.Carts.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      }
    })
    this.setData({
      checkedAll,
      totalNum,
      totalPrice
    })
    wx.setStorageSync('carts', this.Carts)
  },
  async addAddress() {
    const res = await chooseAddress()
    // console.log(res)
    const addressName = res.provinceName + res.cityName + res.countyName + res.detailInfo
    let addressInfo = {
      addressName,
      telNumber: res.telNumber
    }
    this.setData({
      addressInfo
    })
    wx.setStorageSync('address', addressInfo)
  },
  getCartList() {
    //获取本地的carts
    //映射到网页
    this.Carts = wx.getStorageSync('carts')
    this.setData({
      cartList: this.Carts
    })
  },
  handleCheckItem(e) {
    const { index } = e.currentTarget.dataset
    this.Carts[index].checked = !this.Carts[index].checked
    this.computeAll()

  },
  handleCheckAll(e) {
    // console.log(e)
    let checkedAll = !this.data.checkedAll
    this.Carts.forEach(v => v.checked = checkedAll)
    this.computeAll()
    this.setData({
      cartList: this.Carts,
      checkedAll
    })
  },

  //添加减少商品 还存一点bug
  handleOpreation(e) {
    const { opreation, index } = e.currentTarget.dataset
    if (opreation === "sub") {
      if (this.Carts[index].num === 1) {
        wx.showModal({
          title: '提示',
          content: '确认删除该商品吗？',
          success: (res) => {
            if (res.confirm) {
              this.Carts.splice(index, 1)
              // this.onShow()
              this.computeAll()
              this.setData({ cartList: this.Carts })
            }
          }
        })
      } else {
        this.Carts[index].num--
        wx.showToast({
          title: '删除成功',
          success: true,
          mask: true
        })
      }
    } else {
      this.Carts[index].num++
      wx.showToast({
        title: '添加成功',
        success: true,
        mask: true
      })
    }
    this.setData({ cartList: this.Carts })
    this.computeAll()
  },
  handlePay() {
    // 判断用户是否有选中商品以及地址
    const { addressName } = this.data.addressInfo
    const totalNum = this.data.totalNum
    if (!addressName) {
      wx.showToast({
        title: '请输入地址',
        mask: true,
        none: true
      })
      return
    }
    if (totalNum == 0) {
      wx.showToast({
        title: '请选择商品',
        mask: true,
        none: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }
})