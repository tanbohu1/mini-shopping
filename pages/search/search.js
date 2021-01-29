import {request} from "../../request/request"
Page({

  data: {
    searchName:'',
    goodsList:[],
    isHidden:true
  },
  timeId:-1,
  bindKeyInput(e){
    // console.log(e)
    let searchName = e.detail.value
    // 判断searchName的有效性
    if (!searchName.trim()) {
      this.setData({
        isHidden:true,
        // searchName:'',
        goodsList:[]
      })
      return
    }
    this.setData({
      // searchName,
      isHidden:false
    })
    //需要给input事件添加防抖效果：setTimeOut,
    //每次触发input事件的时候,清除上一次定时器，重新定时
    // let timeId = 1
    clearTimeout(this.timeId)
    // searchName有效 发送请求,获取商品列表
    this.timeId = setTimeout(()=>{
      this.getGoodsList(searchName)
    },1000)
  },
  async getGoodsList(query){
    const res = await request({
      url:'/goods/qsearch',
      data:{query}
    })
    // console.log(res)
    this.setData({
      goodsList:res.data.message
    })
  },
  cancelSearch(){
    this.setData({
      isHidden:true,
      searchName:'',
      goodsList:[]
    })
  }
})