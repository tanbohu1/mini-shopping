// components/goodsTab/goodsTab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e){
      // console.log(e)
      const {index} = e.currentTarget.dataset
      this.triggerEvent("changeTab",index)
    }
  }
})
