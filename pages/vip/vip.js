//detail.js
//获取应用实例
const app = getApp()
const pay = require('../../common/request/pay')

Page({
  data: {
    vip: {
      vip30: '../../images/vip30.png',
      vip90: '../../images/vip90.png'
    }
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: '会员购买'
    })
  },
  //发起微信支付
  requestPayment: function(data) {
    wx.requestPayment({
      timeStamp: parseInt(new Date().getTime() / 1000) + '',
      nonceStr: data.NonceStr,
      package: 'prepay_id=' + data.PrepayID,
      signType: 'MD5',
      paySign: data.Sign,
      success: function (res) {
        wx.showToast({
          title: '会员购买成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        console.log('会员购买失败:', res.errMsg)
        wx.showToast({
          title: '会员购买失败',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
  onBuyVip: function(e) {
    console.log('onBuyVip:', e.currentTarget.dataset)
    console.log('onBuyVip:', e.currentTarget.dataset.price)
    let data = {
      GoodsDesc: "会员-支付",
      GoodsDetail: e.currentTarget.dataset.detail,
      FeeAmount: e.currentTarget.dataset.price,
      OpenID: app.globalData.userInfo.WxOpenID
    }
    
    wx.request({
      url: pay.createtransaction,
      header: {
        Userkey: app.globalData.userInfo.UserKey
      },
      data: data,
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        let resData = res.data || {}
        if (resData.RspHeader && resData.RspHeader.ErrNo == 200) {
          let rspJson = resData.RspJson || []
          this.requestPayment(rspJson);
        } else {
          wx.showToast({
            title: resData.RspHeader.ErrMsg,
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  }
})