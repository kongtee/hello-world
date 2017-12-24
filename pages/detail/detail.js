//detail.js
//获取应用实例
const app = getApp()
const recommend = require('../../common/request/recommend')

Page({
  data: {
    id: 0,
    title: '',
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
    if (!app.globalData.userInfo.bVip && current >= 3) {
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
    let id = option.id || ''
    let title = option.title
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
          if (!app.globalData.userInfo.bVip) {
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
      title: title
    })
    this.setData({
      id: id,
      title: title
    })
  },
  onShareAppMessage: function (res) {
    let title = this.data.title
    let path = '/pages/detail/detail?id=' + this.data.id + '&title=' + title
    return {
      title: title,
      path: path,
      success: function (res) {
        console.log('转发成功')
        // 转发成功
      },
      fail: function (res) {
        console.log('转发失败')
        // 转发失败
      }
    }
  }
})