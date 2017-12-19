//detail.js
//获取应用实例
const app = getApp()
const recommend = require('../../common/request/recommend')

Page({
  data: {
    imgList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
          let rspJson = resData.RspJson || [];
          this.setData({
            imgList: rspJson.Urls
          });
        }
      }
    })
    wx.setNavigationBarTitle({
      title: option.title
    })
  }
})