//app.js
const account = require('./common/request/account')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: account.thirdpartywxlogin,
          data: {
            code: res.code
          },
          method: 'POST',
          success: (res) => {
            console.log('login:',res.data)
            let rspJson = res && res.data && res.data.RspJson || {}
            Object.assign(this.globalData.userInfo, rspJson)
            console.log('userInfo:', this.globalData.userInfo)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              Object.assign(this.globalData.userInfo, res.userInfo)
              console.log('userInfo2:', this.globalData.userInfo)
            }
          })
        }
      }
    })
    //获取系统信息
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res
      }
    })
  },
  globalData: {
    userInfo: {},
    systemInfo: {}
  }
})