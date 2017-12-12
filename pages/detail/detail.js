//detail.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgList: [
      'http://r.ezenlive.cn/ksyunadmin/5a2106a7619be23043.jpeg',
      'http://r.ezenlive.cn/ksyunadmin/5a21172337f1d91928.jpeg',
      'http://r.ezenlive.cn/ksyunadmin/5a1e85f50937b91227.jpeg'
    ]
  },
  enterRoom: function () {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '丰满可爱的美女小可爱',
    })
  }
})