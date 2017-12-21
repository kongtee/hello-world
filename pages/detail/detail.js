//detail.js
//获取应用实例
const app = getApp()
const recommend = require('../../common/request/recommend')

Page({
  data: {
    imgList: [],
    currentIndex: 0
  },
  //滑动事件处理函数
  onSwiperChange: function (e) {
    let current = e.detail.current
    this.setData({
      currentIndex: current
    })
    console.log(this.data.currentIndex)
    if (app.globalData.userInfo.ChargeNum <= 0 && current >= 3) {
      wx.navigateTo({
        url: '../vip/vip'
      })
      setTimeout(()=>{
        this.setData({
          currentIndex: current - 1
        })
      }, 500)
    }
  },
  onLoad: function (option) {
    console.log('onload:', option);
    let id = option.id || '';
    wx.request({
      url: recommend.styleimagelist,
      data: {
        StyleID: id
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data);
        let resData = res.data || {};
        if (resData.RspHeader && resData.RspHeader.ErrNo == 200) {
          let Urls = resData.RspJson && resData.RspJson.Urls || [];
          if (app.globalData.userInfo.ChargeNum <= 0) {
            Urls = Urls.slice(0, 3)
            Urls.push('')
          } 
          this.setData({
            imgList: Urls
          });
        }
      }
    })
    wx.setNavigationBarTitle({
      title: option.title
    })
  }
})